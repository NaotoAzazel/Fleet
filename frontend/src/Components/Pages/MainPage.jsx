import { Button } from '../UI/Button.jsx';
import { Element } from "react-scroll";
import InformationCard from '../cards/InformationCard.jsx';

function MainPage() {
  return (
    <main className="bg-background min-h-screen text-white relative flex flex-col items-center">
      <selection className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl tracking-normal font-bold font-manrope md:text-5xl lg:text-6xl">
            Приложение, построенное с использованием React 18
          </h1>
          <div className="space-x-4">
            <Button href="/auth">Авторизация</Button>
            <Button variant="outline" href="/asd">GitHub</Button>
          </div>
        </div>
      </selection>

      <selection className="container space-y-6 py-28 md:py-12 md:pt-24 lg:py-36">
        <Element name="technologies">
          <h2 className="text-center mx-auto max-w-[58rem] font-heading tracking-normal text-3xl md:text-4xl 
            lg:text-5xl font-bold font-manrope">
            Технологии проекта
          </h2>
        </Element>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <InformationCard 
            title="React 18" 
            text="Приложения, маршрутизация, макеты, загрузка пользовательского интерфейса и API." 
          />

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
      </selection>
    </main>
  )
}

export default MainPage