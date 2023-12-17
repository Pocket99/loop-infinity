
let yoyoData = [];

const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/getProductData');
    const data = await response.json();

    console.log(data);
    yoyoData = data.map(item => ({
      
      id: item[0],
      name: item[1],
      imageUrl: item[2],
      description: item[3],
      price: item[4],
      videoUrl: item[5]
    }));
    console.log(yoyoData);
  } catch (err) {
    console.error("Failed to fetch yoyo data:", err);
  }
};

fetchData();

export { yoyoData };

// export const yoyoData = [
//     { id: 1, name: 'YoYo 1', imageUrl: 'https://down-sg.img.susercontent.com/file/pl-11134201-7qukw-lics67iz6d2e58', description: 'This is YoYo 1.', price: 10 },
//     { id: 2, name: 'YoYo 2', imageUrl: 'https://gd1.alicdn.com/imgextra/i4/1047942607/O1CN01LrZSYi1V83LmMbnxO_!!1047942607.jpg_400x400.jpg', description: 'This is YoYo 2.', price: 20 },
//     // more yo-yos...
//   ];