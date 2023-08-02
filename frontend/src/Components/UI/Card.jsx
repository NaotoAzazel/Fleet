import { MyButton } from "./MyButton.jsx";

function Card({ image, title, takeBy }) {
  return (
    <div className="border border-borderColor overflow-hidden rounded-[10px]">
      <div className="flex flex-col border-borderColor p-0">
        <div className="relative width-[100%] pb-48 inset-0">
          <img 
            src={image} 
            alt="transport image" 
            className="absolute h-full w-full inset-0 border-borderColor object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
      </div>

      <div className="p-4">
        <h1>{title}</h1>
      </div>

      <div className="flex items-center p-4">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <MyButton variant="outline" size="sm" className="w-full">Подробнее</MyButton>
          {takeBy.length ? (
            <MyButton size="sm" className="w-full cursor-not-allowed">Недоступна</MyButton>
          ) : (
            <MyButton size="sm" className="w-full">Забрать</MyButton>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card