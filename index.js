var http = require("http");
var hostname = "127.0.0.1"; //내 컴퓨터 주소
var port = 8080;
const server = http.createServer(function (req, res) {
  const path = req.url;
  const method = req.method;
  if (path === "/products") {
    if (method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" }); //배열보냄
      const products = JSON.stringify([
        {
          //배열 스트링화
          name: "농구공",
          price: 5000,
        },
      ]);
      res.end(products);
    } else if (method === "POST") {
      res.end("생성되었습니다!");
    }
  }
  res.end("Good Bye");
});

server.listen(port, hostname);
console.log("grab market server on!");
