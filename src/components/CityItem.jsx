import { Link } from "react-router-dom";

import styles from "./CityItem.module.css";
import { useCities } from "../contexts/hooks/useCities.jsx";
import { flagEmojiToPNG, formatDate } from "../utils/helperFunctions.jsx";

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const handleClick = (e) => {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          city.id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span>{emoji ? flagEmojiToPNG(emoji) : ""}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;