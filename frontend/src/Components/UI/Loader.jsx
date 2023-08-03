import loadingIcon from "../../assets/loadingIcon.png"

function Loader() {
  return (
    <div className="flex justify-center items-center min-h-full container">
      <div className="mx-auto sm:p-6 grid place-items-center gap-5 p-3 bg-cardBackground rounded-[10px] border border-borderColor">
        <div className="overflow-hidden">
          <img src={loadingIcon} width="64" height="64" alt="Auth icon" className="mx-auto animate-blur rounded-lg" />
        </div>
        <h1 className="font-bold font-manrope text-2xl tracking-tight mx-auto">Загрузка данных...</h1>
      </div>
    </div>
  )
}

export default Loader