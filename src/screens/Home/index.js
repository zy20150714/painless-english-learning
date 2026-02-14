import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Card, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>无痛英语</Title>
        <Text style={styles.subtitle}>轻松学单词，无需注册</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>开始学习</Title>
          <Text style={styles.cardText}>选择一个模块开始你的英语学习之旅</Text>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="contained" 
            style={styles.button} 
            onPress={() => navigation.navigate('WordLearning')}
          >
            开始学习
          </Button>
          <Button 
            mode="outlined" 
            style={styles.button} 
            onPress={() => navigation.navigate('Review')}
          >
            复习
          </Button>
        </Card.Actions>
        <Card.Actions style={styles.cardActions}>
          <Button 
            mode="outlined" 
            style={styles.button} 
            onPress={() => navigation.navigate('Test')}
          >
            测试
          </Button>
          <Button 
            mode="outlined" 
            style={styles.button} 
            onPress={() => navigation.navigate('Resource')}
          >
            资源库
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>今日目标</Title>
          <Text style={styles.cardText}>学习10个单词，复习20个单词</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>学习统计</Title>
          <Text style={styles.cardText}>总学习单词: 0</Text>
          <Text style={styles.cardText}>掌握率: 0%</Text>
          <Text style={styles.cardText}>连续学习: 0天</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  card: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  cardActions: {
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
