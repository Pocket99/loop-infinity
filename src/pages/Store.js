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
