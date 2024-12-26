

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
    name: 'Blitzball Ver 2.0',
    imageUrl: '/images/blitzball_main.jpg',
    description: 'A high-performance yo-yo designed by Chenghao Yi, the six-time China National Champion and Asian Champion. Perfect for those who aspire to take their yo-yo skills to the next level..',
    price: 10.99,
    videoUrl: 'https://www.youtube.com/embed/6G8a8AgdXmY',
    price_id: 'price_1QZZSZGX1i6I66OXSRWKLViC', 
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
    name: 'BlitzBall Ver 2.0 - Jadeite Series',
    imageUrl: '/images/BlitzBall Ver 3.0 - Jadeite Series/main.jpg',
    description: 'The Jadeite Series brings a stunning blend of colors and smooth performance, ideal for showcasing 2A division tricks with elegance.',
    price: 10.99,
    videoUrl: 'https://www.youtube.com/embed/d1YL0B12fVQ',
    price_id: 'price_1QZZSWGX1i6I66OXJxXIVE8h',
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
    name: 'BlitzBall ver2.0 Gold&Silver',
    imageUrl: '/images/BlitzBall Ver 3.0 Gold&Silver/main.jpg',
    description: 'Experience premium quality and style with the Gold & Silver edition, crafted for both beginners and seasoned players.',
    price: 10.99,
    videoUrl: 'https://www.youtube.com/embed/ilCSb88gUpA',
    price_id: 'price_1QZZSVGX1i6I66OXqDqiIDj8',
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
    description: 'Inspired by the power and precision of V12 car engines, this yo-yo delivers unmatched performance with a sleek design.',
    price: 16.99,
    videoUrl: 'https://www.youtube.com/embed/QizHr7t-T5A',
    price_id: 'price_1QZZSSGX1i6I66OXEfNdaVqV',
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
    description: 'A signature yo-yo designed in collaboration with Principal Qiao, a dance master, combining rhythm and precision for a unique playing experience.',
    price: 16.99,
    videoUrl: '',
    price_id: 'price_1QZZSQGX1i6I66OXp02fBssI',
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
    description: 'Designed for champions, this yo-yo pays tribute to Zirui Qiu with precision engineering and an inspiring look.',
    price: 17.99,
    videoUrl: '',
    price_id: 'price_1QZZSOGX1i6I66OXwkKp1Z0g',
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
    price_id: 'price_1QZZSNGX1i6I66OXSGqCwFEF',
    weight: 0.1,
    colors: [
      {name: "main", imageUrl: "/images/diy.png"},
    ],
  },
  {
    id: 8,
    name: 'Wind Ball',
    imageUrl: '/images/Wind Ball/Clear.webp',
    description: 'Designed for speed, the Wind Ball is a high-performance yo-yo perfect for mastering fast-paced 2A division tricks.',
    price: 11.99,
    videoUrl: '',
    price_id: 'price_1QZZSLGX1i6I66OXV4CFOev6',
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
    description: "Celebrate love and yo-yoing with the Valentine's Gift edition, available in charming designs and colors.",
    price: 10.99,
    videoUrl: '',
    price_id: 'price_1QZZSJGX1i6I66OXSIGmjARB',
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
    description: 'High-quality thin strings optimized for 2A division yo-yos, ensuring smooth and responsive play.',
    price: 11.99,
    videoUrl: '',
    price_id: 'price_1QZZSHGX1i6I66OXUEiPOjtK',
    weight: 0.1,
    colors: [
      {name: "White", imageUrl: "/images/2A String (Thin) x100/white.webp"},
    ],
  },
  {
    id:11,
    name: 'Metal Spacer for Blitz Ball (2pcs)',
    imageUrl:'/images/Metal Spacer for Blitz Ball (2pcs)/Purple (weak rebound).webp',
    description: "Enhance your Blitz Ball's performance with these precision-engineered metal spacers available in rebound options.",
    price: 2.99,
    videoUrl: '',
    price_id: 'price_1QZZSDGX1i6I66OXzI4rAwul',
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
    description: "Achieve the perfect balance and gap width with these durable shims designed for the Blitz Ball.",
    price: 1.99,
    videoUrl: '',
    price_id: 'price_1QZZSGGX1i6I66OXIOanQPNn',
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
