const express = require("express")
const redis = require("redis")

const client = redis.createClient({
  // host: "https://redis-server.com" -> 도커 환경이 아닌 경우
  host: "redis-server", // docker-compose.yml 파일에 명시한 컨테이너를 넣어주면 된다.
  port: 6379,
})

client.set("hitnum", 0)

const app = express()

app.get("/", (req, res) => {
  client.get("hitnum", (err, hitnum) => {
    // 현재 hitnum 값을 가져와서 +1 해줍니다.
    client.set("hitnum", parseInt(hitnum) + 1)
    res.send("숫자가 1씩 올라갑니다! 숫자 : " + hitnum)
  })
})

app.listen(4539)
console.log("Server is Running")
