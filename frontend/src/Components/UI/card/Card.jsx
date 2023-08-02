import {useState} from 'react';
import MyButton from '../button/MyButton';
import classes from "./Card.module.css"
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmallModal from '../smallModal/SmallModal';
import carImage from "../../../assets/gta5carOrange.jpg";

function Card({visibleModal, setVisibleModal, ...props}) {
  const [isHoverPopUp, setIsHoverPopUp] = useState(false);
  const [attributesName, setAttributesName] = useState("");

  const labels = ["type", "color", "plate"];
  const attributes = {"type": "Тип транспорта", "color": "Цвет транспорта", "plate": "Государственный номер"};

  return (
    <div className={classes.card}>
      <FontAwesomeIcon className={classes.icon} 
        onClick={() => setVisibleModal(true)}
        icon={faBars} 
        size="xl" 
        style={{color: "white", position: "absolute", left: "80%", top: "24px", zIndex: "20"}}
      />

      <div className={classes.car_info}>
        <p className={classes.car_brand}>{props.cars.brand}</p>

        {labels.map((label) => (
          <span 
            key={label} 
            className={classes.button} 
            style={{marginRight: "2%"}}
            onMouseEnter={() => (
              setIsHoverPopUp(true),
              setAttributesName(label)
            )}
            onMouseLeave={() => setIsHoverPopUp(false)} 
          >
            {props.cars[label]}
          </span>
        ))}
      </div>
      
      <hr style={{width: "100%", marginTop: "2px"}} />
      <SmallModal style={{marginTop: "8px", zIndex: "10", background: "white", color: "black", fontSize: "14px"}} visible={isHoverPopUp}>{attributes[attributesName]}</SmallModal>

      <MyButton
        style={{
          background: "#196F22", 
          color: "white", 
          transform: "translateX(50%)", 
          right: "50%", 
          bottom: "10px", 
          fontSize: window.innerWidth > 1100 ? "22px" : "16px",
          position: "absolute", 
          padding: "6px 14px",
          zIndex: "5"
      }}
      >
        {!props.takeBy.length ? "Взять" : "Занята"}
      </MyButton>
      <img 
        className={classes.image}
        src={carImage}
        alt="carImage"
      ></img>
    </div>
  )
}

export default Card