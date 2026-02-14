import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, Card } from 'react-native-paper';

export default function WordCard({ word, phonetic, meanings, examples, imageUrl }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <TouchableOpacity onPress={handleFlip} activeOpacity={0.8}>
      <Card style={styles.card}>
        {!flipped ? (
          <Card.Content>
            <View style={styles.frontContent}>
              {imageUrl && (
                <Image 
                  source={{ uri: imageUrl }} 
                  style={styles.image} 
                  resizeMode="contain"
                />
              )}
              <Text style={styles.word}>{word}</Text>
              {typeof phonetic === 'object' ? (
                <View style={styles.phoneticContainer}>
                  <Text style={styles.phoneticLabel}>美: </Text>
                  <Text style={styles.phonetic}>{phonetic.us}</Text>
                  <Text style={styles.phoneticLabel}> 英: </Text>
                  <Text style={styles.phonetic}>{phonetic.uk}</Text>
                </View>
              ) : (
                <Text style={styles.phonetic}>{phonetic}</Text>
              )}
              <Text style={styles.flipHint}>点击卡片翻转查看释义</Text>
            </View>
          </Card.Content>
        ) : (
          <Card.Content>
            <View style={styles.backContent}>
              <Text style={styles.meaningsTitle}>释义</Text>
              {meanings.map((meaning, index) => (
                <View key={index} style={styles.meaningItem}>
                  <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
                  <Text style={styles.definition}>{meaning.definition}</Text>
                  <Text style={[styles.level, { backgroundColor: getLevelColor(meaning.level) }]}>
                    {meaning.level}
                  </Text>
                </View>
              ))}
              
              {examples && examples.length > 0 && (
                <>
                  <Text style={styles.examplesTitle}>例句</Text>
                  {examples.map((example, index) => (
                    <View key={index} style={styles.exampleItem}>
                      <Text style={styles.exampleSentence}>{example.sentence}</Text>
                      <Text style={styles.exampleTranslation}>{example.translation}</Text>
                    </View>
                  ))}
                </>
              )}
              
              <Text style={styles.flipHint}>点击卡片返回</Text>
            </View>
          </Card.Content>
        )}
      </Card>
    </TouchableOpacity>
  );
}

// 根据单词级别返回对应颜色
const getLevelColor = (level) => {
  switch (level) {
    case 'A1':
      return '#4CAF50'; // 绿色
    case 'A2':
      return '#8BC34A';
    case 'B1':
      return '#FFC107'; // 黄色
    case 'B2':
      return '#FF9800'; // 橙色
    case 'C1':
      return '#F44336'; // 红色
    case 'C2':
      return '#9C27B0'; // 紫色
    case 'R':
      return '#2196F3'; // 蓝色
    default:
      return '#607D8B'; // 灰色
  }
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },
  frontContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  backContent: {
    paddingVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  phonetic: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  phoneticContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  phoneticLabel: {
    fontSize: 16,
    color: '#999',
  },
  flipHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 20,
  },
  meaningsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  meaningItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  partOfSpeech: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  definition: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  level: {
    fontSize: 12,
    color: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  examplesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 16,
  },
  exampleItem: {
    marginBottom: 12,
  },
  exampleSentence: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  exampleTranslation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
