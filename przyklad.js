import MealItem from "./MealItem/MealItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";

const PizzaMenu = () => {
  const [data, setData] = useState([]);
  const [newId, setNewId]=useState("");
  const [newItem, setNewItem] = useState("");
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
          image: newImage, // Ustaw odpowiednią wartość ceny
          name: newItem,
          price: newPrice
          
        }
      );
      setData([...data, response.data]);
      setNewItem("");
      setNewPrice("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(
        "https://restouracjaapi.azurewebsites.net/api/PizzaMenu/${id}"
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

      <div className={classes.addItemContainer}>
      <input
          type="text"
          placeholder="id pizzy"
          value={newId}
          onChange={(e) => setNewId(e.target.value)}
        />
        <input
          type="text"
          placeholder="nazwa pizzy"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          type="text"
          placeholder="nowa cena"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="link do obrazka"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};

const Card = ({ name, image, price, deleteItem }) => (
  <div className="card">
    <img src={image} alt={name} />
    <h3>{name}</h3>
    <h3>Opis: {price}</h3>
    <button className="delete-button" onClick={deleteItem}>
      Usuń
    </button>
  </div>
);

export default PizzaMenu;