require('dotenv').config();  // 환경 변수 로드
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 기본 경로
app.get('/', (req, res) => {
  res.send('서버가 정상적으로 실행 중입니다.');
});

// 액세스 토큰 요청
app.post('/auth/kakao/token', async (req, res) => {
  const { code } = req.body;

  try {
    // 액세스 토큰 요청
    const tokenResponse = await axios.post(
      `https://kauth.kakao.com/oauth/token`,
      {},
      {
        params: {
          grant_type: 'authorization_code',
          client_id: KAKAO_REST_API_KEY,
          redirect_uri: KAKAO_REDIRECT_URI,
          code,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    console.log("Received Access Token:", accessToken); // 발급된 액세스 토큰을 출력
    res.json({ accessToken });
  } catch (error) {
    console.error('카카오 액세스 토큰 발급 실패:', error.message);
    res.status(500).json({ error: '카카오 액세스 토큰 발급에 실패했습니다.' });
  }
});

// 카카오 로그인 콜백 처리
app.post('/auth/kakao/callback', async (req, res) => {
  const { token } = req.body;  // token이 올바르게 설정되는지 확인

  if (!token) {
    return res.status(400).json({ error: '토큰이 필요합니다.' });
  }

  try {
    // 카카오 API로 사용자 정보 요청
    const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,  // 받은 토큰을 Bearer 방식으로 전달
      },
    });

    // 카카오로부터 받은 사용자 정보
    const userInfo = response.data;
    res.json({
      message: '카카오 로그인 처리가 완료되었습니다.',
      userInfo,  // 사용자 정보 반환
    });
  } catch (error) {
    console.error('카카오 사용자 정보 가져오기 실패:', error.message);
    res.status(500).json({ error: '카카오로부터 사용자 정보를 가져오는 데 실패했습니다.' });
  }
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error('서버 에러:', err);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
