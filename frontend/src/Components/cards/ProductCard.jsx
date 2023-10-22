import { Button } from "../UI/Button.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/globals.css";

export function SkeletonCard({ cards }) {
  return (
    Array(cards).fill(0).map((item, index) => (
      <div className="border border-borderColor overflow-hidden rounded-[10px]" key={index}>
        <div className="flex flex-col border-borderColor p-0">
          <div className="relative flex pb-48 inset-0">
            <div className="absolute inset-0">
              <div className="flex w-full h-full items-center justify-center bg-secondary">
                <FontAwesomeIcon icon={faImage} className="w-[36px] h-[36px]" style={{color: "#a1a1aa"}}/>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-zinc-700 w-1/2 h-5 animate-pulse rounded-lg" />
        </div>

        <div className="flex items-center p-4">
          <div className="flex w-full flex-col items-center gap-2 sm:flex-row sm:justify-between">
            <div className="inline-flex h-9 px-2 rounded-md w-full bg-zinc-700 animate-pulse" />
            <div className="inline-flex h-9 px-2 rounded-md w-full bg-zinc-700 animate-pulse" />
          </div>
        </div>
      </div>
    ))
  )
}

export function SlicedProductCard({ image, title }) {
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
    </div>
  )
}

export function ProductCard({ image, title, buttonText, setIsAboutClick, setCurrentId, id }) {
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
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => {
              setIsAboutClick(true);
              setCurrentId(id);
            }}
          >
            Подробнее
          </Button>
          <Button size="sm" className={`w-full 
            ${buttonText === "Недоступна" && "cursor-not-allowed hover:bg-white"}`}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  )
}