import ReactDOM from "react-dom";
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

  const editItem = async (id, newName, newPrice) => {
    try {
      const response = await axios.put(
        `https://restouracjaapi.azurewebsites.net/api/PizzaMenu/${id}`,
        {
          name: newName,
          price: newPrice,
        }
      );
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, name: newName, price: newPrice } : item
      );
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
          id={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
          deleteItem={() => deleteItem(item.id)}
          editItem={editItem}
        />
      ))}
      <div className="container__text2">
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
            <textarea
              placeholder="opis przepisu"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="styledOpis"
              wrap="hard"
              rows="4"
              cols="123"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ id, name, image, price, deleteItem, editItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editItem(id, newName, newPrice);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(name);
    setNewPrice(price);
  };

  return (
    <div className="container__text">
      <div className="card">
        <img src={image} alt={name} />
        {isEditing ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="input-styledPrzepis2"
            />
            <div className="opis2">
              <textarea
                placeholder="opis przepisu"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="styledOpis2"
                wrap="hard"
                rows="4"
                cols="90"
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="tytul">{name}</h1>
            <p className="opisPrzepisu">{price}</p>
          </>
        )}
        {isEditing ? (
          <>
            <button className="zmien-button" onClick={handleSave}>
              Zapisz
            </button>
            <button className="anuluj-button" onClick={handleCancel}>
              Anuluj
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={handleEdit}>
            E
          </button>
        )}
        <button className="delete-button" onClick={deleteItem}>
          Usuń
        </button>
      </div>
    </div>
  );
};

export default PizzaMenu;
