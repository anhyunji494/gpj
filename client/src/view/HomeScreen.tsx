// WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const handlePress = () => {
    Alert.alert("버튼을 눌렀습니다!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>메인 화면에 오신 것을 환영합니다!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center',     // 수평 중앙 정렬
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, // 텍스트와 버튼 사이의 간격 추가
  },
});

export default HomeScreen;
