// Store.js
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; 
import './Store.css';
import { yoyoData } from './yoyoData';


const Store = () => {
  const [yoyos, setYoyos] = useState([]); // This state will store our fetched YoYos
  //set yoyo data from yoyoData.js
  useEffect(() => {
    setYoyos(yoyoData);
  }, []);


  return (
    <div className="store-container">
      {yoyos.filter(yoyo => yoyo.id !== 7).map(yoyo => (
        <div className="yoyo-card" key={yoyo.id}>
          <Link to={{ pathname: `/store/${yoyo.id}` }} className="yoyo-link">
            <img src={yoyo.imageUrl} alt={yoyo.name} className="yoyo-image" />
          </Link>
          <div className="yoyo-info">
            <h2 className="yoyo-name">{yoyo.name}</h2>
            <p className="yoyo-price">${yoyo.price}</p>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default Store;
