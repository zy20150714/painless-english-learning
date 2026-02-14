import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Title, Text, Card, Button, IconButton } from 'react-native-paper';
import WordCard from '../../components/WordCard';
import AudioPlayer from '../../components/AudioPlayer';

export default function WordLearningScreen() {
  const [currentWord, setCurrentWord] = useState({
    word: 'painless',
    phonetic: {
      us: '/ˈpeɪnləs/',
      uk: '/ˈpeɪnləs/'
    },
    meanings: [
      { partOfSpeech: 'adjective', definition: 'Causing you no pain', level: 'A1' },
      { partOfSpeech: 'adjective', definition: 'Not causing any physical pain', level: 'B2' },
      { partOfSpeech: 'adjective', definition: 'Less difficult or unpleasant than expected', level: 'R' },
    ],
    examples: [
      {
        sentence: 'The vaccination was painless, I hardly felt a thing.',
        translation: '疫苗是无痛的，我几乎没感觉。'
      }
    ],
    imageUrl: 'https://example.com/painless.png'
  });

  const handleNextWord = () => {
    // 这里可以从词库中获取下一个单词
    // 暂时使用模拟数据
    setCurrentWord({
      word: 'example',
      phonetic: {
        us: '/ɪɡˈzæmpəl/',
        uk: '/ɪɡˈzɑːmpl/'
      },
      meanings: [
        { partOfSpeech: 'noun', definition: 'Something that is typical of the group that it is a member of', level: 'A1' },
        { partOfSpeech: 'noun', definition: 'A fact, event, or situation that can be used to demonstrate a general rule', level: 'B1' },
      ],
      examples: [
        {
          sentence: 'This is a good example of modern art.',
          translation: '这是现代艺术的一个好例子。'
        }
      ],
      imageUrl: 'https://example.com/example.png'
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>单词学习</Title>
        <Text style={styles.subtitle}>点击卡片翻转查看释义</Text>
      </View>

      <WordCard 
        word={currentWord.word}
        phonetic={currentWord.phonetic}
        meanings={currentWord.meanings}
        examples={currentWord.examples}
        imageUrl={currentWord.imageUrl}
      />

      <View style={styles.audioContainer}>
        <AudioPlayer word={currentWord.word} phoneticData={currentWord.phonetic} />
      </View>

      <View style={styles.actions}>
        <Button 
          mode="contained" 
          style={styles.button} 
          onPress={handleNextWord}
        >
          下一个单词
        </Button>
        <Button 
          mode="outlined" 
          style={styles.button}
        >
          添加到复习
        </Button>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>词根分析</Title>
          <Text style={styles.cardText}>pain (疼痛) + less (无) → 无痛的</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.cardTitle}>联想记忆</Title>
          <Text style={styles.cardText}>想象打疫苗时没有感觉，就是 painless</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  card: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  audioContainer: {
    margin: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});
