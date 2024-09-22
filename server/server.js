const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('서버가 정상적으로 실행 중입니다.');
});

app.post('/auth/kakao/callback', (req, res) => {
  console.log('Received Kakao callback:', req.body);

  // 토큰 검증 및 사용자 정보 처리 로직
  // 실제 구현 시에는 카카오 API를 사용하여 토큰을 검증하고 사용자 정보를 가져와야 합니다.
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token is required' });
  }

  // 여기에서 토큰을 사용하여 카카오 API로 사용자 정보를 가져오는 로직을 구현해야 합니다.
  // 이 예제에서는 간단히 성공 메시지만 반환합니다.
  res.json({
    message: 'Kakao login processed successfully',
    // 실제로는 여기에 사용자 정보나 세션 토큰 등을 포함시킬 수 있습니다.
    // userInfo: { ... }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
