// LoginScreen.tsx

import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  unlink,
} from '@react-native-seoul/kakao-login';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const API_URL = 'http://10.0.2.2:3000'; // Android 에뮬레이터용 서버 주소

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const LoginScreen = ({ navigation }: Props) => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async (
    apiFunc: () => Promise<any>,
    successMessage: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFunc();
      setResult(
        typeof response === 'string'
          ? response
          : JSON.stringify(response, null, 2),
      );
      console.log(successMessage, response);
    } catch (err) {
      console.error(`Error in ${apiFunc.name}:`, err);
      // 예외 변수를 any 타입으로 단언하여 사용
      const errorMessage =
        (err as any).message || 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signInWithKakao = async (): Promise<void> => {
    await handleApiCall(async () => {
      const token = await login();
      console.log('Kakao token:', token);

      try {
        const response = await api.post('/auth/kakao/callback', { token });
        console.log('Server response:', response.data);
        // 로그인 성공 시 MainScreen으로 이동
        navigation.navigate('Main');
        return response.data;
      } catch (error) {
        console.error('Axios error details:', {
          message: (error as any).message,
          status: (error as any).response?.status,
          data: (error as any).response?.data,
          headers: (error as any).response?.headers,
          config: (error as any).config,
        });
        throw error; // 에러를 다시 던져서 handleApiCall에서 처리하도록 함
      }
    }, 'Login successful');
  };

  const signOutWithKakao = () => handleApiCall(logout, 'Logout successful');
  const getProfile = () => handleApiCall(getKakaoProfile, 'Profile retrieved');
  const unlinkKakao = () => handleApiCall(unlink, 'Kakao account unlinked');

  const renderButton = (title: string, onPress: () => void) => (
    <Pressable style={styles.button} onPress={onPress} disabled={loading}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {renderButton('카카오 로그인', signInWithKakao)}
      {renderButton('프로필 조회', getProfile)}
      {renderButton('링크 해제', unlinkKakao)}
      {renderButton('카카오 로그아웃', signOutWithKakao)}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      {result !== '' && <Text>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  button: {
    backgroundColor: '#FEE500',
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default LoginScreen;
