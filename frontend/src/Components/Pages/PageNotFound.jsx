import { Helmet } from "react-helmet";
import { MyButton } from "../UI/MyButton.jsx";
import Icon404 from "../../assets/Icon404.png";
import "../../Styles/globals.css"

function PageNotFound() {
  return (
    <main className="bg-background">
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>
      <div className="text-white min-h-screen relative flex items-center container">
        <div className="mx-auto sm:p-6 grid place-items-center gap-5 p-3 bg-cardBackground rounded-[10px] border border-borderColor">
          <div className="overflow-hidden rounded-lg place-items-center">
            <img src={Icon404} height="84" width="84" alt="404 Icon" className="mx-auto animate-blur"/>
          </div>
          <div className="grid gap-3">
            <h1 className="font-bold text-3xl tracking-tight mx-auto">404</h1>
            <p className="text-muted-foreground">Мы не нашли страницу, которую вы искали</p>
          </div>
          <div className="space-x-4 mx-auto">
            <MyButton href="/">Главная</MyButton>
            <MyButton href="/transport">Список транспорта</MyButton>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PageNotFound