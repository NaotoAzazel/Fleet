import { Button } from "../Button";
import Label from "../Label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../utils/utils";

export default function InformationModal({ post, setIsInformationModalActive }) {
  const { name, takeBy, color, plate, category, updatedAt } = post;

  return (
    <>
      <div className="flex justify-between px-4 items-center">
        <h1 className="text-white text-2xl font-semibold font-manrope">Информация о {name}</h1>
        <Button variant="hidden" onClick={() => setIsInformationModalActive(false)}>
          <FontAwesomeIcon icon={faXmark} size="xl" />
        </Button>
      </div>
      <div className="grid grid-cols-2 items-center gap-2 sm:grid-cols-2 md:grid-cols-3 
        mt-4 px-4 justify-between w-full"
      >
        <Label title="Категория" placeholder={category} />
        <Label title="Цвет" placeholder={color} />
        <Label title="Статус" placeholder={takeBy?.length ? `Занял ${takeBy}` : "Доступно"} />
      </div>
      <div className="px-4 mt-2 space-y-2 text">
        <Label title="Название" placeholder={name} />
        <Label title="Номера" placeholder={plate} />
        <Label title="Последнее обновление" placeholder={formatDate(updatedAt)} />
      </div>
    </>
  )
}
