import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';
import { MyButton } from "../UI/MyButton.jsx"; 
import resizeImage from "../../assets/612x420.jpg";
import Card from "../UI/Card.jsx";

function TransportList() {
  const dataFromAPI = [
    { name: "Lamborghini", takeBy: "naotoazazel", color: "Red", plate: "A1488B", image: "../../assets/resizeImage.jpg" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
    { name: "Pagani", takeBy: "", color: "Blue", plate: "A1488B", image: "" },
  ];
  const navigate = useNavigate();
  
  const {user, loading} = useContext(AuthContext);
  const [transportData, setTransportData] = useState([]);

  const adminsID = new Set(["297674392903876608"]);
  const userID = user.user_metadata?.provider_id;

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/auth");
    }

    setTransportData(dataFromAPI);
  }, [!loading]);

  return (
    <main className="flex-1 min-h-screen text-white">
      <selection className="grid items-center gap-8 pb-8 pt-6 md:py-8 container">
        <h1 className="text-2xl leading-[1.1] tracking-normal font-bold font-manrope md:text-4xl lg:text-3xl">Список доступного транспорта</h1>
        <div className="flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <MyButton size="sm">Сортировка</MyButton>
            { adminsID.has(userID) ? (
              <MyButton size="sm">Добавить траспорт</MyButton>
            ) : (null)}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {transportData.map((value, index) => {
              return (
                <Card 
                  key={index}
                  image={resizeImage}
                  title={value.name}
                  takeBy={value.takeBy}
                />
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <h1>pagination</h1>
          </div>
        </div>
      </selection>
    </main>
  )
}

export default TransportList