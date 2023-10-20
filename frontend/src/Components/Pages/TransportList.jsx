import { useEffect, useState, memo, useMemo } from 'react';
import { Button } from "../UI/Button.jsx"; 
import { ProductCard, SkeletonCard } from "../cards/ProductCard.jsx";
import PostService from "../../API/PostService.js";
import Modal from '../UI/Modal.jsx';
import Input from '../UI/Input.jsx';
import PostsNotFound from '../cards/PostsNotFound.jsx';
import ErrorLoading from '../cards/ErrorLoading';
import SearchableDropdown from '../UI/SearchableDropdown';
import { DropdownMenu } from '../UI/DropdownMenu.jsx';
import { useFetching } from '../../hooks/useFetching';
import { useAuth } from '../../hooks/Auth';
import useStatusOptions from "../../hooks/useStatusOptions.js"
import { getPageCount, getPagesArray, addTransport, toFormattedOptions, 
  handleButtonText } from "../../utils/utils.js";
import { sortOptions } from "../../utils/menuOptions.js";
import { adminsID } from "../../utils/constants.js";

const MemorizedPosts = memo(ProductCard);

function TransportList() {
  const { user } = useAuth();
  const statusOptions = useStatusOptions();
  const isFetchPostsCalled = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [sortName, setSortName] = useState("");
  const [status, setStatus] = useState("");

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

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page, sortName, status) => {
    const response = await PostService.getAll(limit, page, sortName, status);
    const totalCount = response.headers["x-total-count"];
    
    setPosts(response.data);
    setTotalPages(getPageCount(totalCount, limit));
  });
  
  const [fetchColors, isColorsLoading] = useFetching(async() => {
    const colors = await PostService.getColors();
    const formattedColors = toFormattedOptions(colors.data);
    
    setColors(formattedColors);
  });
  
  const [fetchCategories, isCategoriesLoading] = useFetching(async() => {
    const categories = await PostService.getCategories();
    const formattedCategories = toFormattedOptions(categories.data);

    setCategories(formattedCategories);
  });

  let pagesArray = getPagesArray(totalPages);

  const userID = user.user_metadata?.provider_id;

  useEffect(() => {
    if(!isFetchPostsCalled?.value) {
      fetchPosts(limit, page);
      fetchColors();
      fetchCategories();
      isFetchPostsCalled.value = true;
    }
  }, [page]);

  useEffect(() => {
    if (status || sortName) {
      fetchPosts(limit, page, sortName, status);
    }
  }, [sortName, status]);

  function changePage(page) {
    setPage(page);
    fetchPosts(limit, page, sortName, status);
  }

  const memorizedPosts = useMemo(() => {
    return posts.map((post) => 
      <MemorizedPosts 
        key={post._id}
        image={`data:image/png;base64,${post.image}`}
        title={post.name}
        buttonText={handleButtonText(post.takeBy, user)}
      />
    ) 
  });

  return (
    <main className="flex-1 min-h-screen text-white bg-background">
      <selection className="grid items-center gap-8 pb-8 pt-6 md:py-8 container">
        <h1 className="text-2xl leading-[1.1] tracking-normal font-bold font-manrope md:text-4xl lg:text-3xl">
          Список доступного транспорта
        </h1>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <DropdownMenu 
              selectValue={sortName}
              onSelectChange={setSortName}
              title="Сортировка"
              options={[...sortOptions, ...categories]}
              isLoading={isPostsLoading}
            />

            <DropdownMenu 
              selectValue={status}
              onSelectChange={setStatus}
              title="Статус"
              options={statusOptions}
              buttonVariant="outline" 
              isSearchable={true} 
              inputPlaceHolder="Введите статус"
              isLoading={isPostsLoading}
            />

            {adminsID.has(userID) && (
              <Button 
                size="sm"
                onClick={() => setModalActive(true)}
                className="ml-2"
                isLoading={isPostsLoading}
              >
                Добавить траспорт
              </Button>
            )}
          </div>

          {postError && (
            <div className="flex items-center justify-center h-full">
              <ErrorLoading title={postError} />
            </div>
          )}

          {!posts.length && !isPostsLoading && !postError && (
            <div className="flex items-center justify-center h-full">
              <PostsNotFound />
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {isPostsLoading
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
          <div className="flex justify-between px-4">
            <h1 className="text-white text-2xl font-bold font-manrope">Добавить транспорт</h1>
          </div>

          <div className="flex items-center space-x-2 mt-4 px-4">
            <SearchableDropdown 
              inputPlaceHolder="Категория"
              onSelectChange={setCategory}
              selectValue={category}
              options={categories}
            />

            <SearchableDropdown 
              inputPlaceHolder="Цвет"
              onSelectChange={setColor}
              selectValue={color}
              options={colors}
            />
          </div>
          
          <div className="flex flex-col text-white mt-4 space-y-4 px-4">
            <Input 
              type="text"
              placeholder="Название"
              onChange={e => setName(e.target.value)}
              value={name}
            />

            <Input 
              type="text"
              placeholder="Номер"
              onChange={e => setPlate(e.target.value)}
              value={plate}
            />
            
            <Input 
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              styles="max-w-[300px]"
            />
          </div>
          
          <div className="space-x-2 flex justify-end mt-4 px-4">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setModalActive(false)} 
              className="text-white"
            >
              Отмена
            </Button>

            <Button 
              onClick={() => {
                addTransport(name, color, plate, category, file)
                  .then(setModalActive(false), fetchPosts(limit, page, sortName, status));
              }} 
              size="sm"
            >
              Добавить
            </Button>
          </div>
        </Modal>
      </selection>
    </main>
  )
}

export default TransportList;