import { Button } from "../UI/Button.jsx";
import Icon404 from "../../assets/Icon404.png";
import "../../Styles/globals.css"

function ErrorCard() {
  return (
    <div className="mx-auto sm:p-6 grid place-items-center gap-5 p-3 bg-modalBackground rounded-[10px] border border-borderColor">
      <div className="overflow-hidden rounded-lg place-items-center">
        <img 
          src={Icon404} 
          height="84" 
          width="84" 
          alt="404 Icon" 
          className="mx-auto animate-blur duration-700"
        />
      </div>
      <div className="grid gap-3">
        <h1 className="font-bold text-3xl tracking-tight mx-auto">404</h1>
        <p className="text-muted-foreground">Мы не нашли страницу, которую вы искали</p>
      </div>
      <div className="space-x-4 mx-auto">
        <Button href="/">Главная</Button>
        <Button variant="outline" href="/transport">Список транспорта</Button>
      </div>
    </div>
  )
}

export default ErrorCard