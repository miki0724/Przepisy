import MealItem from "./MealItem/MealItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";

const PizzaMenu = () => {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newId, setNewId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://restouracjaapi.azurewebsites.net/api/PizzaMenu"
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addItem = async () => {
    try {
      const response = await axios.post(
        "https://restouracjaapi.azurewebsites.net/api/PizzaMenu",
        {
          id: newId,
          name: newItem,
          price: newPrice,
          Image: newImage, // Ustaw odpowiednią wartość ceny
        }
      );
      setData([...data, response.data]);
      setNewItem("");
      setNewPrice("");
      setNewImage("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        `https://restouracjaapi.azurewebsites.net/api/PizzaMenu/${id}`
      );
      const updatedData = data.filter((item) => item.id !== id);
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {data.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
          deleteItem={() => deleteItem(item.id)}
        />
      ))}
      <div class="container__text2">
        <h1 className="tytulKonsola">Konsola dodawania nowych przepisów</h1>
        <div className="caloscDodawanie">
          <div className="card-2" id="dodaj">
            <input
              type="text"
              placeholder="Podaj id przepisu"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              className="input-styledID"
            />
            <input
              type="text"
              placeholder="tytuł przepisu"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              className="input-styledPrzepis"
            />
            <input
              type="text"
              placeholder="link do obrazka"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="input-styled"
            />
            <button className="dodajPrzepis" onClick={addItem}>
              Dodaj przepis
            </button>
          </div>
          <div className="opis">
            <input
              type="text"
              placeholder="opis przepisu"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="input-styledOpis"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ name, image, price, deleteItem }) => (
  <div class="container__text">
    <div className="card">
      <img src={image} alt={name} />
      <h1 className="tytul">{name}</h1>
      <h3>Opis: {price}</h3>
      <button className="delete-button" onClick={deleteItem}>
        Usuń
      </button>
    </div>
  </div>
);

export default PizzaMenu;
