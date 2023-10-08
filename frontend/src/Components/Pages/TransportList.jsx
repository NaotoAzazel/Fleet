import { useEffect, useContext, useState, memo, useMemo } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { Button } from "../UI/Button.jsx"; 
import Card from "../cards/ProductCard.jsx";
import PostService from "../../API/PostService.js";
import { useFetching } from '../../hooks/useFetching';
import { getPageCount, getPagesArray } from "../../utils/utils.js";
import SkeletonCard from '../cards/SkeletonCard';
import Modal from '../UI/Modal.jsx';
import DropDown from '../UI/DropDown.jsx';
import Input from '../UI/Input.jsx';
import PostsNotFound from '../cards/PostsNotFound.jsx';

const MemorizedPosts = memo(Card);

function TransportList() {
  const navigate = useNavigate();
  
  const {user, loading} = useContext(AuthContext);
  const [modalActive, setModalActive] = useState(false);
  const [sortName, setSortName] = useState("");

  // APIs
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);

  // variables for adding transport 
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    const response = await PostService.getAll(limit, page);

    setPosts(response.data);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  const memorizedPosts = useMemo(() => {
    return posts.map((post) => 
      <MemorizedPosts 
        key={post._id}
        image={`http://localhost:3001/${post.image}`}
        title={post.name}
        buttonText={handleButtonText(post.takeBy)}
      />
    ) 
  })

  const [fetchColors, isColorsLoading] = useFetching(async() => {
    const colors = await PostService.getColors();
    setColors(colors.data);
  });
  
  const [fetchCategories, isCategoriesLoading] = useFetching(async() => {
    const categories = await PostService.getCategories();
    setCategories(categories.data);
  });

  let pagesArray = getPagesArray(totalPages);

  const adminsID = new Set(["297674392903876608"]);
  const userID = user.user_metadata?.provider_id;
  
  const sortOptions = ["В алфавитном порядке",  "Доступны", "Недоступны", "Взяты тобой", ...categories];

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/auth");
    }

    fetchPosts(limit, page);
    fetchColors();
    fetchCategories();
  }, [!loading && page]);

  function changePage(page) {
    setPage(page);
    fetchPosts(limit, page);
  }

  function addTransport() {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("takeBy", "");
    formData.append("color", color);
    formData.append("plate", plate);
    formData.append("category", category);
    formData.append("image", file);

    PostService.createTransport(formData).then(setModalActive(false), fetchPosts(limit, page));
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
            <DropDown 
              selectValue={sortName}
              onSelectChange={setSortName}
              buttonText="Сортировка"
              options={sortOptions} 
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

          {!posts.length && !isPostsLoading && (
            <div className="flex items-center justify-center h-full">
              <PostsNotFound />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isPostsLoading && isColorsLoading && isCategoriesLoading && posts.length
              ? <SkeletonCard cards={8}/>
              : <>{memorizedPosts}</>
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
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <DropDown 
              buttonText="Категория" 
              options={categories} 
              selectValue={category} 
              onSelectChange={setCategory} 
            />
            <DropDown 
              buttonText="Цвет" 
              options={colors} 
              selectValue={color}
              onSelectChange={setColor}
            />
          </div>
          
          <div className="flex flex-col text-white mt-4 space-y-4">
            <Input 
              type="text"
              placeholder="Введите категорию"
              onChange={e => setCategory(e.target.value)}
              value={category}
            />

            <Input 
              type="text"
              placeholder="Введите цвет"
              onChange={e => setColor(e.target.value)}
              value={color}
            />

            <Input 
              type="text"
              placeholder="Введите название"
              onChange={e => setName(e.target.value)}
              value={name}
            />

            <Input 
              type="text"
              placeholder="Введите номер"
              onChange={e => setPlate(e.target.value)}
              value={plate}
            />

            <input type="file" onChange={e => setFile(e.target.files[0])} className="max-w-[300px]"/>
          </div>
          
          <div className="space-x-2 flex justify-end mt-4">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setModalActive(false)} 
              className="text-white"
            >
              Отмена
            </Button>
            <Button onClick={addTransport} size="sm">Добавить</Button>
          </div>
        </Modal>
      </selection>
    </main>
  )
}

export default TransportList;