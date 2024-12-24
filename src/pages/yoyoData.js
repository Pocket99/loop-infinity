

// const fetchData = async () => {
//   try {
//     const response = await fetch('http://127.0.0.1:5000/getProductData');
//     const data = await response.json();

//     console.log(data);
//     yoyoData = data.map(item => ({
      
//       id: item[0],
//       name: item[1],
//       imageUrl: item[2],
//       description: item[3],
//       price: item[4],
//       videoUrl: item[5]
//     }));
//     console.log(yoyoData);
//   } catch (err) {
//     console.error("Failed to fetch yoyo data:", err);
//   }
// };

// fetchData();

// 假设的YoYo数据
const yoyoData = [
  {
    id: 1,
    name: 'Blitzball Ver 3.0',
    imageUrl: '/images/blitzball_main.jpg',
    description: 'This yoyo was crafted by the talented Chenghao Yi, the 2018 Asian Champion and a remarkable six-time China National Champion.',
    price: 10.99,
    videoUrl: 'https://www.youtube.com/embed/6G8a8AgdXmY',
    price_id: 'price_1QZXMOGX1i6I66OXyfX8AmuB',
    weight: 0.1,
    colors: [
      { name: "Deep Blue - Yellow Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Deep Blue - Yellow Cap Black Text.jpg" },
      { name: "Fluorescent Yellow - Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Fluorescent Yellow- Black Text.jpg" },
      { name: "Jade Green - White Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Jade Green - White Cap Black Text.jpg" },
      { name: "Solid Orange - Transparent Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Solid Orange- Transparent Cap Black Text.jpg" },
      { name: "Solid Orange - White Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Solid Orange- White Cap Black Text.jpg" },
      { name: "Solid Pink - Transparent Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Solid Pink- Transparent Cap Black Text.jpg" },
      { name: "Transparent White - Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Transparent White - Black Text.jpg" },
      { name: "Transparent White - Rose Red Text", imageUrl: "/images/BlitzBall Ver 3.0/Transparent White - Rose Red Text.jpg" },
      { name: "Transparent White - White Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Transparent White - White Cap Black Text.jpg" },
      { name: "Transparent White - Yellow Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0/Transparent White - Yellow Cap Black Text.jpg" },
    ],
  },
  {
    id: 2,
    name: 'BlitzBall Ver 3.0 - Jadeite Series',
    imageUrl: '/images/BlitzBall Ver 3.0 - Jadeite Series/main.jpg',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 10.99,
    videoUrl: 'https://www.youtube.com/embed/d1YL0B12fVQ',
    price_id: 'price_1QZXN7GX1i6I66OXACScW0xA',
    weight: 0.1,
    colors: [
      { name: "Jade Rose Red Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Jade Rose Red Text.jpg" },
      { name: "Jade White Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Jade White Cap Black Text.jpg" },
      { name: "Jade Black Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Jade Black Text.jpg" },
      { name: "Fluorescent Yellow Orange Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Fluorescent Yellow Orange Cap Black Text.jpg" },
      { name: "Fluorescent Yellow White Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Fluorescent Yellow White Cap Black Text.jpg" },
      { name: "Glitter Blue Rose Red Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Glitter Blue Rose Red Text.jpg" },
      { name: "Jade", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Jade.jpg" },
      { name: "Glitter Blue No Logo", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Glitter Blue No Logo.jpg" },
      { name: "Solid Pink Rose Red Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Solid Pink Rose Red Text.jpg" },
      { name: "Solid Pink White Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Solid Pink White Cap Black Text.jpg" },
      { name: "Cyan Orange Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Cyan Orange Cap Black Text.jpg" },
      { name: "Cyan White Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Cyan White Cap Black Text.jpg" },
      { name: "Cyan Yellow Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0 - Jadeite Series/Cyan Yellow Cap Black Text.jpg" },
    ],
  },
  {
    id: 3,
    name: 'BlitzBall ver3.0 Gold&Silver',
    imageUrl: '/images/BlitzBall Ver 3.0 Gold&Silver/main.jpg',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 10.99,
    videoUrl: 'https://www.youtube.com/embed/ilCSb88gUpA',
    price_id: 'price_1QZXNoGX1i6I66OXuivm19HZ',
    weight: 0.1,
    colors: [
      { name: "Solid Orange Black Cap Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid Orange Black Cap Silver.jpg" },
      { name: "Solid White Black Cap Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid White Black Cap Silver.jpg" },
      { name: "Solid White Red Cap Gold", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid White Red Cap Gold.jpg" },
      { name: "Solid White Red Cap Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid White Red Cap Silver.jpg" },
      { name: "Solid White Black Cap Gold", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid White Blue Cap Gold.jpg" },
      { name: "Solid White Transparent Cap Black Text", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid White Transparent Cap Black Text.jpg" },
      { name: "Solid White Black Text", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid White Black Text.jpg" },
      { name: "Solid Black Gold", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid Black Gold.jpg" },
      { name: "Solid Black Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Solid Black Silver.jpg" },
      { name: "Deep Red Black Cap Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Deep Red Black Cap Silver.jpg" },
      { name: "Deep Blue Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Deep Blue Silver.jpg" },
      { name: "Jade Green Black Cap Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Jade Green Black Cap Silver.jpg" },
      { name: "Jade Green Black Cap Gold", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Jade Green Black Cap Gold.jpg" },
      { name: "Jade Green Red Cap Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Jade Green Red Cap Silver.jpg" },
      { name: "Transparent Red Gold", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Transparent Red Gold.jpg" },
      { name: "Transparent Red Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Transparent Red Silver.jpg" },
      { name: "Transparent Blue Cap Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Transparent Blue Cap Silver.jpg" },
      { name: "Transparent Black Silver", imageUrl: "/images/BlitzBall Ver 3.0 Gold&Silver/Transparent Black Silver.jpg" },
    ],
  },
  {
    id: 4,
    name: 'v12',
    imageUrl: '/images/v12/main.jpg',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 16.99,
    videoUrl: 'https://www.youtube.com/embed/QizHr7t-T5A',
    price_id: 'price_1QZXOTGX1i6I66OXBAeiKTMx',
    weight: 0.1,
    colors: [
      { name: "Large V Transparent Green Silver", imageUrl: "/images/v12/Large V Transparent Green Silver.jpg" },
      { name: "Large V Transparent Green Black Cap Silver", imageUrl: "/images/v12/Large V Transparent Green Black Cap Silver.jpg" },
      { name: "Large V Transparent Red Silver", imageUrl: "/images/v12/Large V Transparent Red Silver.jpg" },
      { name: "Small V Transparent Green Silver", imageUrl: "/images/v12/Small V Transparent Green Silver.jpg" },
      { name: "Small V Transparent Green Black Cap Silver", imageUrl: "/images/v12/Small V Transparent Green Black Cap Silver.jpg" },
      { name: "Small V Transparent Red Silver", imageUrl: "/images/v12/Small V Transparent Red Silver.jpg" },
    ],
  },
  {
    id: 5,
    name: 'ROCK HOUSE x Principal Qiao Signature Yo-Yo',
    imageUrl: '/images/ROCK HOUSE x Principal Qiao Signature Yo-Yo/Solid Black Pink Text.jpg',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 16.99,
    videoUrl: '',
    price_id: 'price_1QZXP2GX1i6I66OXsUmWubBB',
    weight: 0.1,
    colors: [
      { name: "Solid Orange Black Text", imageUrl: "/images/ROCK HOUSE x Principal Qiao Signature Yo-Yo/Solid Orange Black Text.jpg" },
      { name: "Solid White Pink Text", imageUrl: "/images/ROCK HOUSE x Principal Qiao Signature Yo-Yo/Solid White Pink Text.jpg" },
      { name: "Deep Red White", imageUrl: "/images/ROCK HOUSE x Principal Qiao Signature Yo-Yo/Deep Red White.jpg" },
      { name: "Fluorescent Green Black Text", imageUrl: "/images/ROCK HOUSE x Principal Qiao Signature Yo-Yo/Fluorescent Green Black Text.jpg" },
      { name: "Transparent Black Text", imageUrl: "/images/ROCK HOUSE x Principal Qiao Signature Yo-Yo/Transparent Black Text.jpg" },
      { name: "Solid Black Pink Text", imageUrl: "/images/ROCK HOUSE x Principal Qiao Signature Yo-Yo/Solid Black Pink Text.jpg" },
    ],
  },
  {
    id: 6,
    name: 'Destiny - Zirui Qiu Signature Yo-Yo',
    imageUrl: '/images/Destiny - Zirui Qiu Signature Yo-Yo/main.jpg',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 17.99,
    videoUrl: '',
    price_id: 'price_1QZXKDGX1i6I66OXeWsRSXC4',
    weight: 0.1,
    colors: [
      {name: "main", imageUrl: "/images/Destiny - Zirui Qiu Signature Yo-Yo/main.jpg"},
      {name: "Thank you for supporting Zirui Qiu", imageUrl: "/images/Destiny - Zirui Qiu Signature Yo-Yo/Thank you for supporting Zirui Qiu.jpg"},
    ],
  },
  {
    id: 7,
    name: 'Custom Yo-Yo',
    imageUrl: '/images/diy.png',
    description: 'Customize your own yo-yo design!',
    price: 19.99,
    videoUrl: '',
    price_id: 'price_1QZXIwGX1i6I66OXPI6ORZoy',
    weight: 0.1,
    colors: [
      {name: "main", imageUrl: "/images/diy.png"},
    ],
  },
  {
    id: 8,
    name: 'Wind Ball',
    imageUrl: '/images/Wind Ball/Clear.webp',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 11.99,
    videoUrl: '',
    price_id: 'price_1QZXnSGX1i6I66OXlCyMAoWX',
    weight: 0.1,
    colors: [
      {name: "Clear", imageUrl: "/images/Wind Ball/Clear.webp"},
      {name: "Orange", imageUrl: "/images/Wind Ball/Orange.webp"},
    ],
  },
  {
    id: 9,
    name: 'Valentines Gift',
    imageUrl: '/images/Valentines Gift/main.jpg',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 10.99,
    videoUrl: '',
    price_id: 'price_1QZXt1GX1i6I66OXofboiKmR',
    weight: 0.1,
    colors: [
      {name: "Solid White Blue Text", imageUrl: "/images/Valentines Gift/Solid White Blue Text.png"},
      {name: "Solid White Pink Text", imageUrl: "/images/Valentines Gift/Solid White Pink Text.png"},
      {name: "Transparent White Blue Text", imageUrl: "/images/Valentines Gift/Transparent White Blue Text.png"},
      {name: "Transparent White Pink Text", imageUrl: "/images/Valentines Gift/Transparent White Pink Text.png"},
    ],
  },
  {
    id: 10,
    name:'2A String (Thin) x100',
    imageUrl: '/images/2A String (Thin) x100/white.webp',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 11.99,
    videoUrl: '',
    price_id: 'price_1QZXy7GX1i6I66OX7LaU5hZL',
    weight: 0.1,
    colors: [
      {name: "White", imageUrl: "/images/2A String (Thin) x100/white.webp"},
    ],
  },
  {
    id:11,
    name: 'Metal Spacer for Blitz Ball (2pcs)',
    imageUrl:'/images/Metal Spacer for Blitz Ball (2pcs)/Purple (weak rebound).webp',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 2.99,
    videoUrl: '',
    price_id: 'price_1QZY0wGX1i6I66OXJlPYMmty',
    weight: 0.1,
    colors: [
      {name: "Purple (weak rebound)", imageUrl: "/images/Metal Spacer for Blitz Ball (2pcs)/Purple (weak rebound).webp"},
      {name: "Black (strong rebound)", imageUrl: "/images/Metal Spacer for Blitz Ball (2pcs)/Black (Strong rebound).webp"},
      {name: "Gold (Standard)", imageUrl: "/images/Metal Spacer for Blitz Ball (2pcs)/Gold (Standard).webp"},
    ],
  },
  {
    id: 12,
    name: 'Shim for Blitzball (4pcs)',
    imageUrl: '/images/Shim for Blitzball (4pcs)/Shim for Blitzball (4pcs).webp',
    description: 'These are aftermarket parts for yo-yo 2A division.',
    price: 1.99,
    videoUrl: '',
    price_id: 'price_1QZXzvGX1i6I66OXeMjz0nLu',
    weight: 0.1,
    colors: [
      {name: "Shim for Blitzball (4pcs)", imageUrl: "/images/Shim for Blitzball (4pcs)/Shim for Blitzball (4pcs).webp"},
    ],
  }

  // ... 更多YoYo数据
];


export { yoyoData };

// export const yoyoData = [
//     { id: 1, name: 'YoYo 1', imageUrl: 'https://down-sg.img.susercontent.com/file/pl-11134201-7qukw-lics67iz6d2e58', description: 'This is YoYo 1.', price: 10 },
//     { id: 2, name: 'YoYo 2', imageUrl: 'https://gd1.alicdn.com/imgextra/i4/1047942607/O1CN01LrZSYi1V83LmMbnxO_!!1047942607.jpg_400x400.jpg', description: 'This is YoYo 2.', price: 20 },
//     // more yo-yos...
//   ];