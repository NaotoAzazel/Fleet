import { MyButton } from '../UI/MyButton.jsx';
import { Element } from "react-scroll";

function MainPage() {
  return (
    <main className="bg-background min-h-screen text-white relative flex flex-col items-center">
      <selection className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl leading-[1.1] tracking-normal font-bold font-manrope md:text-4xl lg:text-5xl">
            Пример приложения, построенного с использованием React 18
          </h1>
          <div className="space-x-4">
            <MyButton href="/auth">Авторизация</MyButton>
            <MyButton variant="outline" href="/asd">GitHub</MyButton>
          </div>
        </div>
      </selection>

      <selection className="container space-y-6 py-28 md:py-12 md:pt-24 lg:py-36">
        <Element name="technologies">
          <h2 className="text-center mx-auto max-w-[58rem] font-heading tracking-normal text-3xl md:text-4xl lg:text-5xl font-bold font-manrope">
            Технологии проекта
          </h2>
        </Element>

        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-[10px] border border-borderColor p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold font-manrope">React 18</h3>
                <p className="text-sm text-muted-foreground">
                  Приложения, маршрутизация, макеты, загрузка пользовательского интерфейса и API.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[10px] border border-borderColor p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold font-manrope">Database</h3>
                <p className="text-sm text-muted-foreground">
                  ORM с использованием MongoDB с Mongoose и развернутая на MongoDB Atlas.
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[10px] border border-borderColor p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold font-manrope">Components</h3>
                <p className="text-sm text-muted-foreground">
                  Компоненты интерфейса стилизированы при помощи Tailwind CSS. 
                </p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[10px] border border-borderColor p-2">
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold font-manrope">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Аутентификация с использованием Supabase и middlewares.
                </p>
              </div>
            </div>
          </div>
        </div>
      </selection>
    </main>
  )
}

export default MainPage