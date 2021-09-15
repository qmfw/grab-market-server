const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models");
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/products", (req, res) => {
  models.Product.findAll().then((result)=>{
    console.log("PRODUCTS : ",result);
    res.send({
      products : result
    })
  }).catch((error)=>{
    console.error(error);
    res.send("에러 발생");
  })
  //ctrl+c 서버실행 종료
  //http://localhost:8080/products?id=1000&name=grab
  //http://localhost:8080/products 둘이 똑같아
  res.send({
    products: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageUrl: "images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 50000,
        seller: "메시",
        imageUrl: "images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageUrl: "images/products/keyboard1.jpg",
      },
    ],
  });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller } = body;
  if (!name || !description || !price || !seller) {
    res.send("모든 필드를 입력해주세요"); //방어 코드
  }
  models.Product.create({
    name, //name : name
    description,
    price,
    seller,
  })
    .then((result) => {
      console.log("상품 생성 결과 : ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.error(error);
      res.send("상품 업로드에 문제가 발생했습니다");
    });
});

app.get("/products/:id/events/:eventId", (req, res) => {
  const params = req.params;
  const { id, eventId } = params;
  res.send(`id는 ${id}와 ${eventId}입니다`);
});

app.listen(port, () => {
  console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB 연결 성공!");
    })
    .catch((err) => {
      console.error(err);
      console.log("DB 연결 에러 ㅠ");
      process.exit();
    });
});

//sequelize init 터미널 -> 모델 및 폴더들 생성
//노션에서 코드 config에 붙여넣기
