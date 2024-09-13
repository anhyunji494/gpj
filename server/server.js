const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 기본 라우트
app.get('/', (req, res) => {
  res.send('서버가 정상적으로 실행 중입니다.');
});

// 카카오 로그인 콜백 라우트 (나중에 구현)
app.get('/auth/kakao/callback', (req, res) => {
  // 카카오 로그인 처리 로직
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
