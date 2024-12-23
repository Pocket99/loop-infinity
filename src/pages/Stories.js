import React from 'react';
import teamInfo from './teamInfo.json';
import './Stories.css'; 


const Stories = () => {
  return (
    <div className="container">

      <h1>{teamInfo.title}</h1>
      <img src="/images/yichenghao.jpg" alt="YCH-YOYO Logo" style={{ width: "300px", display: "block", margin: "0 auto 20px" }} />
      {teamInfo.content.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
        
      ))}
      <h1>Who is Yi Chenghao?</h1>
      <h2>A Legend and Innovator in the Yo-Yo World</h2>
      <h2>About the Founder</h2>
      <p>Yi Chenghao, born in Chenghai, Shantou, Guangdong, is a renowned yo-yo player and entrepreneur. His journey with yo-yos began in 2008 when he first discovered them through the TV drama <em>Blazing Teens</em>. In 2010, he started exploring yo-yo tricks, and by 2012, he was fully committed to mastering the 2A dual-hand looping category.</p>
      <h2>Achievements in Competitions</h2>
        <ul>
            <li><strong>2015–2019:</strong> Five-time National Champion in China Yo-Yo 2A Division</li>
            <li><strong>2018:</strong> Champion of the Singapore Asia Yo-Yo Championship 2A Division (China’s first-ever 2A champion)</li>
            <li><strong>2017:</strong> 4th place, Iceland World Yo-Yo Championship 2A Division</li>
            <li><strong>2018:</strong> 5th place, Shanghai World Yo-Yo Championship 2A Division</li>
        </ul>
      <iframe 
        className="youtube-video"
        src="https://www.youtube.com/embed/MSDDD_k4vhk" 
        title="Loop Infinity YouTube Video" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  );
}

export default Stories; 