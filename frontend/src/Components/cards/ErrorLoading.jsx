import Icon404 from "../../assets/Icon404.png";

function ErrorLoading({ title }) {
  return (
    <div className="mx-auto sm:p-6 grid place-items-center gap-5 p-3 bg-modalBackground 
      rounded-[10px]">
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
        <h1 className="font-bold font-manrope sm:text-3xl 
          tracking-tight mx-auto text-2xl">Ошибка: {title}</h1>
        <p 
          className="text-muted-foreground mx-auto text-center"
        >
          Ошибка загрузки постов. Пожалуйста, свяжитесь с технической поддержкой для решения проблемы.
        </p>
      </div>
    </div>
  )
}

export default ErrorLoading