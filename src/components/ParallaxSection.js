import React, { useEffect, useState } from 'react';
import './ParallaxSection.css';

const ParallaxSection = ({ imageUrl, children }) => {
  const [offsetY, setOffsetY] = useState(0); // 记录滚动位置

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY); // 获取当前页面的滚动距离
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="parallax-container">
      {/* 背景图片 */}
      <div
        className="parallax-image"
        style={{
          transform: `translateY(-${offsetY * 0.5}px)`, // 根据滚动偏移图片位置
        }}
      ></div>

      {/* 前景内容 */}
      <div
        className="parallax-content"
        style={{
          transform: `translateY(-${offsetY * 0.2}px)`, // 根据滚动偏移图片位置
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
