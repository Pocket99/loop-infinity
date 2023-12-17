// Store.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; 
import './Store.css';


const Store = () => {
  const [yoyos, setYoyos] = useState([]); // This state will store our fetched YoYos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/getProductData');
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          id: item[0],
          name: item[1],
          imageUrl: item[2],
          description: item[3],
          price: item[4],
          videoUrl: item[5]
        }));

        setYoyos(formattedData); // Once the data is formatted, update our state with the new yoyos

      } catch (err) {
        console.error("Failed to fetch yoyo data:", err);
      }
    };

    fetchData();  // We call the fetchData within the useEffect

  }, []); 


  return (
    <div className="store">
      {yoyos.map(yoyo => (
        <div className="yoyo-item" key={yoyo.id}>
          <Link to={{pathname: `/store/${yoyo.id}`}} >
            <img src={yoyo.imageUrl} alt={yoyo.name} className="member-image"/>
          </Link>
          <h2>{yoyo.name}</h2>
          <p>${yoyo.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Store;
