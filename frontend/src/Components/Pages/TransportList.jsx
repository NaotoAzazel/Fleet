import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { Button } from "../UI/Button.jsx"; 
import Card from "../cards/ProductCard.jsx";
import PostService from "../../API/PostService.js";
import { useFetching } from '../../hooks/useFetching';
import { getPageCount, getPagesArray } from "../../utils/utils.js";
import SkeletonCard from '../UI/SkeletonCard';
import Modal from '../UI/Modal.jsx';
import DropDown from '../UI/DropDown.jsx';

function TransportList() {
  const navigate = useNavigate();
  
  const {user, loading} = useContext(AuthContext);
  const [transportData, setTransportData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [dropDownActive, setDropDownActive] = useState(false);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    const response = await PostService.getAll(limit, page);

    setTransportData(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  let pagesArray = getPagesArray(totalPages);

  const adminsID = new Set(["297674392903876608"]);
  const userID = user.user_metadata?.provider_id;

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/auth");
    }

    fetchPosts(limit, page);
  }, [!loading && page]);

  function changePage(page) {
    setPage(page);
    fetchPosts(limit, page);
  }

  function handleButtonText(nickName) {
    if(nickName === user.user_metadata.full_name) {
      return "Вернуть";
    }

    if(nickName.length) {
      return "Недоступна";
    }

    return "Забрать";
  }

  return (
    <main className="flex-1 min-h-screen text-white">
      <selection className="grid items-center gap-8 pb-8 pt-6 md:py-8 container">
        <h1 className="text-2xl leading-[1.1] tracking-normal font-bold font-manrope md:text-4xl lg:text-3xl">
          Список доступного транспорта
        </h1>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center">
            <Button 
              size="sm"
              onClick={() => setDropDownActive(!dropDownActive)}
            >
              Сортировка
            </Button>
            
            <DropDown 
              active={dropDownActive} 
              setActive={setDropDownActive} 
              options={["По названию", "В алфавитном порядке", "Легковый", "Мотоциклы", "Джипы"]} 
            />

            {adminsID.has(userID) && (
              <Button 
                size="sm"
                onClick={() => setModalActive(true)}
                className="ml-2"
              >
                Добавить траспорт
              </Button>
            )}
          </div>

          {postError && (
            <h1 className="text-2xl leading-[1.1] tracking-normal font-bold font-manrope md:text-4xl lg:text-3xl">
              Произошла ошибка: {postError}
            </h1>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isPostsLoading 
              ? <SkeletonCard cards={8}/>
              : (transportData.map(value => {
                  return (
                    <Card 
                      isLoading={isPostsLoading}
                      key={value._id}
                      image={`http://localhost:3001/${value.image}`}
                      title={value.name}
                      takeBy={value.takeBy}
                      buttonText={handleButtonText(value.takeBy)}
                    />
                  )
                }))
            }
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            {!isPostsLoading && (
              pagesArray.map(pageNumber => 
                <Button 
                  onClick={() => changePage(pageNumber)}
                  variant={page === pageNumber ? "default" : "outline"}
                  size="sm" 
                  key={pageNumber}
                  className="h-8 w-8"
                >
                  {pageNumber}
                </Button>  
              )
            )}
          </div>
        </div>

        <Modal active={modalActive} setActive={setModalActive}>
          <div className="flex justify-between">
            <h1 className="text-white text-2xl font-bold font-manrope">Добавить транспорт</h1>
            <button className="text-white self-center" onClick={() => setModalActive(false)} >X</button>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            {/** Добавить выпадающий список для кнопок */}
            <Button size="sm">Выберите категорию</Button>
            <Button size="sm">Выберите цвет</Button>
          </div>
          
          <div className="flex flex-col text-white mt-4 space-y-4">
            <input 
              type="text"
              className="bg-transparent p-2 rounded-[10px] border border-borderColor"
              placeholder="Введите имя"
            />

            <input 
              type="text"
              className="bg-transparent p-2 rounded-[10px] border border-borderColor"
              placeholder="Введите номер"
            />

            <input type="file" className="max-w-[300px]"/>
          </div>
          
          <Button size="sm" className="mt-4 w-full">Добавить</Button>
        </Modal>
      </selection>
    </main>
  )
}

export default TransportList