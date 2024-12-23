import React from 'react';
import './Home.css';
import ParallaxSection from '../components/ParallaxSection';


const Home = () => {
  return (
    <div className="home-container">
      
      {/* 第一部分：视差背景 + 内容 */}
      <ParallaxSection imageUrl="/images/blitzball_main.jpg">
        <h1 class="highlight-text">YCH-YOYO, Build Your Ultimate Yo-Yo Dream</h1>
        {/* <img src= "/images/blitzball_main2.jpg" alt="blitzball_main2" className="top-image" /> */}
      </ParallaxSection>


      {/* <img src="/images/asian_champ.jpg" alt="asian champ" className="top-image" /> */}
      <iframe 
        className="youtube-video"
        src="https://www.youtube.com/embed/6G8a8AgdXmY" 
        title="Loop Infinity YouTube Video" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  );
};

export default Home;
