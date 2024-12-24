import React, { useRef, useState, useEffect } from 'react';
import './Customizer.css';
import { useCart } from './CartContext';
import { useCallback } from 'react';
import { yoyoData } from './yoyoData';


const Customizer = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('red'); // 边框颜色
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null); // 存储上传的图片
  const [isImageSent, setIsImageSent] = useState(false); // New state to manage the "Add to Cart" button
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [scale, setScale] = useState(1);
  const touchStartRef = useRef(null);
  const initialScaleRef = useRef(scale);
  const yoyo = yoyoData.find((y) => y.id === 7);
  const { dispatch } = useCart();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 绘制圆形边框
    const drawBorder = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 20, 0, Math.PI * 2);
      ctx.fillStyle = 'white'; // 背景色
      ctx.fill();
      ctx.lineWidth = 20; // 边框宽度
      ctx.strokeStyle = color; // 边框颜色
      ctx.stroke();
    };

    // 绘制上传的图片
    const drawImage = () => {
      if (image) {
        const img = new Image();
        img.src = image;
        img.onload = () => {
          const { x, y } = position;
          const size = canvas.width - 40; // 图片适应圆形内的大小
          const aspectRatio = img.width / img.height;
          let drawWidth, drawHeight;

          if (aspectRatio > 1) {
            drawWidth = size;
            drawHeight = size / aspectRatio;
          } else {
            drawWidth = size * aspectRatio;
            drawHeight = size;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(canvas.width / 2, canvas.height / 2, size / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(
            img,
            x - (drawWidth / 2) * scale,
            y - (drawHeight / 2) * scale,
            drawWidth * scale,
            drawHeight * scale
          );
          ctx.restore();
        };
      }
    };

    drawBorder();
    drawImage();
  }, [color, image, position, scale]);

  // 处理颜色更改
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  // 处理图片上传
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.nativeEvent.offsetX - position.x,
      y: e.nativeEvent.offsetY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.nativeEvent.offsetX - offset.x,
        y: e.nativeEvent.offsetY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      };
    } else if (e.touches.length === 2) {
      initialScaleRef.current = scale;
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartRef.current = { distance };
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && touchStartRef.current) {
      setPosition({
        x: e.touches[0].clientX - touchStartRef.current.x,
        y: e.touches[0].clientY - touchStartRef.current.y,
      });
    } else if (e.touches.length === 2 && touchStartRef.current) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleFactor = distance / touchStartRef.current.distance;
      setScale(Math.min(Math.max(initialScaleRef.current * scaleFactor, 0.5), 3));
    }
  };

  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    setScale((prevScale) => Math.min(Math.max(prevScale + e.deltaY * -0.001, 0.5), 3));
  };

  // 生成预览
  const handleViewProof = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    const newWindow = window.open();
    newWindow.document.write(`<img src="${dataURL}" alt="YoYo Proof"/>`);
  };

  // 添加到购物车
  const handleAddToCart = useCallback(() => {
    if (!isImageSent) {
        alert('Please send the image before adding to the cart.');
        return;
      }
    const dataURL = canvasRef.current.toDataURL({ format: 'png' });
    yoyo.imageUrl = dataURL;
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...yoyo,
        selectedColor: color,
        imageUrl: dataURL, // 替换默认图片为自定义图片
        quantity: parseInt(quantity, 10),
      },
    });
  }, [isImageSent, dispatch, yoyo, color, quantity]);

  const handleSendEmail = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png'); // 获取 Base64 数据
  
    fetch('https://ych-yoyo.com/send-image-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: dataURL, // 发送图片数据
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert('Email sent successfully!');
          setIsImageSent(true); // 设置为 true
        } else {
          alert('Failed to send email: ' + data.error);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div className="customizer">
      <h1>Customize Your Yo-Yo</h1>
      <p>Price: $29.99</p>
      

      {/* 选择颜色 */}
      <label htmlFor="colorSelect">Choose Yo-Yo Color:</label>
      <select id="colorSelect" value={color} onChange={handleColorChange}>
        <option value="">Select a color</option>
        <option value="Yellow">Yellow</option>
        <option value="Blue">Blue</option>
        <option value="Black">Black</option>
        <option value="Green">Green</option>
        <option value="Pink">Pink</option>
        <option value="Purple">Purple</option>
        <option value="Red">Red</option>
        <option value="White">White</option>
        <option value="Orange">Orange</option>
      </select>

      {/* 画布 */}
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          style={{ border: '2px solid black' }}
        ></canvas>
      </div>

      {/* 图片上传 */}
      <div className="image-upload">
        <label htmlFor="imageInput">Upload New Image:</label>
        <input type="file" id="imageInput" onChange={handleImageUpload} />
      </div>


      {/* 数量输入 */}
      <label htmlFor="quantity">Quantity: </label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />

      {/* 说明文本 */}
      <div style={{ backgroundColor: '#ffff', padding: '10px', margin: '20px 0', borderRadius: '5px' }}>
        <p className='info' style={{ color: '#d9534f', fontWeight: 'bold' }}>
            If you have finished customizing, please click the <span style={{ color: '#0275d8', fontWeight: 'bold' }}>"Send Image"</span> button. After you place an order, we will start processing your custom yo-yo and contact you via email.
            If you have additional requirements, such as different designs for the front and back, specific cap color preferences, or bulk orders (quantity {'>'}100), please contact us for directly.
        </p>
      </div>

      {/* 操作按钮 */}
      <div className="controls">
        <button onClick={handleViewProof}>View Proof</button>
        <button className='add-to-cart-btn' onClick={handleAddToCart} disabled={!isImageSent}>Add to Cart</button>
      </div>

      <div className='email'>
        <button onClick={handleSendEmail}>Send Image</button>   
      </div>

    </div>
  );
};

export default Customizer;
