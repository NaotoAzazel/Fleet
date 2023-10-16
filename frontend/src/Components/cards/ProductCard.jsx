import { Button } from "../UI/Button.jsx";
import "../../Styles/globals.css";

function ProductCard({ image, title, buttonText }) {
  return (
    <div className="border border-borderColor overflow-hidden rounded-[10px]">
      <div className="flex flex-col border-borderColor p-0">
        <div className="relative flex pb-48 inset-0">
          <div className="absolute inset-0">
            <div className="flex w-full h-full items-center justify-center bg-secondary">
              <img 
                src={image} 
                className="absolute h-full w-full inset-0 border-borderColor object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              /> 
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h1>{title}</h1>
      </div>

      <div className="flex items-center p-4">
        <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <Button variant="outline" size="sm" className="w-full">Подробнее</Button>
          <Button size="sm" className={`w-full ${buttonText === "Недоступна" && "cursor-not-allowed hover:bg-white"}`}>{buttonText}</Button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard