import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 导入实际的屏幕组件
import HomeScreen from './src/screens/Home';
import WordLearningScreen from './src/screens/WordLearning';
import ReviewScreen from './src/screens/Review';
import TestScreen from './src/screens/Test';
import ResourceScreen from './src/screens/Resource';
import SettingsScreen from './src/screens/Settings';
import PracticeScreen from './src/screens/Practice';
import AIChatScreen from './src/screens/AIChat';

// 创建导航器
const Tab = createBottomTabNavigator();

// 主题配置
const theme = {
  colors: {
    primary: '#4CAF50',
    accent: '#2196F3',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
          <Tab.Screen name="WordLearning" component={WordLearningScreen} options={{ title: '学习' }} />
          <Tab.Screen name="Review" component={ReviewScreen} options={{ title: '复习' }} />
          <Tab.Screen name="Test" component={TestScreen} options={{ title: '测试' }} />
          <Tab.Screen name="Practice" component={PracticeScreen} options={{ title: '练习' }} />
          <Tab.Screen name="AIChat" component={AIChatScreen} options={{ title: 'AI对话' }} />
          <Tab.Screen name="Resource" component={ResourceScreen} options={{ title: '资源' }} />
          <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: '设置' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 32,
  },
});
