import { Button } from '../UI/Button.jsx';
import { Element } from "react-scroll";
import InformationCard from '../cards/InformationCard.jsx';
import { useFetching } from "../../hooks/useFetching.js"; 
import PostService from '../../API/PostService.js';
import { useState, useEffect, memo, useMemo } from 'react';
import { SlicedProductCard, SkeletonCard } from '../cards/ProductCard.jsx';

const MemorizedPosts = memo(SlicedProductCard);

function SelectionContainer({ children }) {
  return (
    <selection className="mx-auto flex w-full max-w-[64rem] flex-col 
      justify-center gap-4 py-12 md:pt-32 container space-y-2">
      {children}
    </selection>
  )
} 

function MainPage() {
  const [posts, setPosts] = useState([]);
  const isFetchPostsCalled = useState(false);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async(limit, page) => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data);
  });

  useEffect(() => {
    if (!isFetchPostsCalled?.value) {
      fetchPosts(3, 1);
      isFetchPostsCalled.value = true;
    }
  }, []);

  const memorizedPosts = useMemo(() => {
    return posts.map((post) => 
      <MemorizedPosts 
        key={post._id}
        image={`data:image/png;base64,${post.image}`}
        title={post.name}
      />
    ) 
  });

  return (
    <main className="bg-background min-h-screen text-white relative flex flex-col items-center">
      <SelectionContainer>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl tracking-normal font-bold font-manrope md:text-5xl lg:text-6xl">
            Приложение, построенное с использованием React 18
          </h1>
          <div className="space-x-4">
            <Button href="/auth">Авторизация</Button>
            <Button variant="outline" href="https://github.com/NaotoAzazel/Fleet">GitHub</Button>
          </div>
        </div>
      </SelectionContainer>

      <SelectionContainer>
        <Element name="technologies">
          <h2 className="text-center mx-auto max-w-[58rem] tracking-normal text-3xl md:text-4xl 
            lg:text-5xl font-semibold font-manrope">
            Технологии проекта
          </h2>
        </Element>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <InformationCard 
            title="Database"
            text="ORM с использованием MongoDB с Mongoose и развернутая на MongoDB Atlas."
          />
          
          <InformationCard 
            title="Components"
            text="Компоненты интерфейса стилизированы при помощи Tailwind CSS."
          />

          <InformationCard 
            title="Authentication"
            text="Аутентификация с использованием Supabase и middlewares."
          />
        </div>
      </SelectionContainer>

      <SelectionContainer>
        <h2 className="text-center mx-auto max-w-[58rem] font-heading tracking-normal text-3xl md:text-4xl 
          lg:text-5xl font-semibold font-manrope">
          Доступный транспорт
        </h2>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {isPostsLoading
              ? <SkeletonCard cards={3}/>
              : <>{memorizedPosts}</>
            }
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Button href="/transport">
            Список транспорта
          </Button>
        </div>
      </SelectionContainer>
    </main>
  )
}

export default MainPage