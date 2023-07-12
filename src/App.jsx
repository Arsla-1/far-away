import React, { useState } from "react";
import Header from "./components/Header";

import "./App.css";
import ListItem from "./components/ListItem";

function App() {
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [isPacked, setIsPacked] = useState(false);
  const [sortby, setSortBy] = useState("input");

  let sortedItems;

  if (sortby === "input") sortedItems = items;

  if (sortby === "description")
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (sortby === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  function handleAddItems() {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        name: input,
        number: quantity,
        packed: false,
      },
    ]);

    setInput("");
  }

  function handleRemoveItems(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handlePacked(id) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, packed: !item.packed };
        } else {
          return item;
        }
      })
    );
  }

  function handleRemoveAll() {
    setItems([]);
  }

  const noOfItems = items.filter((item) => item.packed).length;

  return (
    <div className="App">
      <Header />

      {/* Add Items */}
      <div className="AddItems">
        <p className="title">What do you need for your trip?</p>
        <div className="AddItems__actions">
          <select
            onChange={(e) => setQuantity(e.target.value)}
            className="AddItems__inputs"
            name="quantity"
          >
            {/* <option>Quantity</option> */}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="AddItems__inputs"
            type="text"
            placeholder="item..."
          />
          <button onClick={handleAddItems} className="AddItems__btn">
            ADD
          </button>
        </div>
      </div>

      {/* Display items*/}
      <div className="displayList">
        <div className="grid">
          {sortedItems.map(({ name, number, id, packed }) => {
            return (
              <ListItem
                key={id}
                name={name}
                number={number}
                id={id}
                handleRemoveItems={handleRemoveItems}
                handlePacked={handlePacked}
                packed={packed}
              />
            );
          })}
        </div>
        {items.length > 0 && (
          <div>
            <select
              className="btn-2 btn-2--modified"
              value={sortby}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="input">Sort by input</option>
              <option value="description">Sort by description</option>
              <option value="packed">Sort by packed status</option>
            </select>
            <button onClick={handleRemoveAll} className="btn-2">
              Clear List
            </button>
          </div>
        )}
      </div>

      {/* footer */}
      <div className="footer">
        <p className="title">
          You have {items.length} items on your list, and you already packed{" "}
          <span>{noOfItems}&nbsp;</span>
          <span>
            ({(noOfItems && (noOfItems / items.length).toFixed(2)) * 100}
            %)
          </span>
        </p>
      </div>

      {/* 
    Header
    AddItems
    DisplayList
    <footer>
    */}
    </div>
  );
}

export default App;
