import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to YCH-YOYO</h1>
      <img src="https://pic3.zhimg.com/80/v2-665065d075ef81303684d3966e59ee02_1440w.webp" alt="Descriptive Alt Text" className="top-image" />
      <iframe 
        className="youtube-video"
        src="https://www.youtube.com/embed/MSDDD_k4vhk" 
        title="Loop Infinity YouTube Video" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  );
};

export default Home;
