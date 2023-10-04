// Store.js
import React from 'react';
import { Link } from 'react-router-dom';
import { yoyoData } from './yoyoData';
import './Store.css';


const Store = () => {
  return (
    <div className="store">
      {yoyoData.map(yoyo => (
        <div className="yoyo-item" key={yoyo.id}>
          <Link to={`/store/${yoyo.id}`}>
            <img src={yoyo.imageUrl} alt={yoyo.name} />
          </Link>
          <h2>{yoyo.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Store;
