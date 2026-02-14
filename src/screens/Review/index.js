import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, Button, ProgressBar, IconButton } from 'react-native-paper';

export default function ReviewScreen() {
  const [reviewWords, setReviewWords] = useState([
    { id: 1, word: 'painless', reviewed: false, phonetic: { us: '/ˈpeɪnləs/', uk: '/ˈpeɪnləs/' } },
    { id: 2, word: 'example', reviewed: false, phonetic: { us: '/ɪɡˈzæmpəl/', uk: '/ɪɡˈzɑːmpl/' } },
    { id: 3, word: 'vaccination', reviewed: false, phonetic: { us: '/ˌvæksɪˈneɪʃn/', uk: '/ˌvæksɪˈneɪʃn/' } },
    { id: 4, word: 'difficult', reviewed: false, phonetic: { us: '/ˈdɪfɪkəlt/', uk: '/ˈdɪfɪkəlt/' } },
    { id: 5, word: 'unpleasant', reviewed: false, phonetic: { us: '/ʌnˈpleznt/', uk: '/ʌnˈpleznt/' } },
  ]);

  const [progress, setProgress] = useState(0);
  const [currentMode, setCurrentMode] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleReview = (id) => {
    const updatedWords = reviewWords.map(word => 
      word.id === id ? { ...word, reviewed: true } : word
    );
    setReviewWords(updatedWords);
    const newProgress = (updatedWords.filter(word => word.reviewed).length / reviewWords.length) * 100;
    setProgress(newProgress);
  };

  const startFlashcardMode = () => {
    setCurrentMode('flashcard');
    setCurrentWordIndex(0);
    setShowAnswer(false);
  };

  const startDictationMode = () => {
    setCurrentMode('dictation');
    setCurrentWordIndex(0);
  };

  const startQuizMode = () => {
    setCurrentMode('quiz');
    setCurrentWordIndex(0);
  };

  const handleFlipCard = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNextWord = () => {
    if (currentWordIndex < reviewWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowAnswer(false);
    } else {
      setCurrentMode(null);
    }
  };

  const handlePreviousWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowAnswer(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>复习</Title>
        <Text style={styles.subtitle}>根据记忆曲线，今天需要复习 {reviewWords.length} 个单词</Text>
      </View>

      <Card style={styles.progressCard}>
        <Card.Content>
          <Text style={styles.progressText}>复习进度</Text>
          <ProgressBar 
            progress={progress / 100} 
            color="#4CAF50" 
            style={styles.progressBar} 
          />
          <Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
        </Card.Content>
      </Card>

      {!currentMode ? (
        <>
          <Card style={styles.modeCard}>
            <Card.Content>
              <Text style={styles.modeTitle}>选择复习模式</Text>
              <View style={styles.modeButtons}>
                <Button 
                  mode="contained" 
                  style={styles.modeButton} 
                  onPress={startFlashcardMode}
                >
                  闪卡模式
                </Button>
                <Button 
                  mode="outlined" 
                  style={styles.modeButton} 
                  onPress={startDictationMode}
                >
                  听写模式
                </Button>
                <Button 
                  mode="outlined" 
                  style={styles.modeButton} 
                  onPress={startQuizMode}
                >
                  选择题模式
                </Button>
              </View>
            </Card.Content>
          </Card>

          {reviewWords.map((item) => (
            <Card key={item.id} style={styles.wordCard}>
              <Card.Content>
                <Text style={styles.wordText}>{item.word}</Text>
                <Text style={styles.reviewStatus}>
                  {item.reviewed ? '已复习' : '未复习'}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button 
                  mode={item.reviewed ? "outlined" : "contained"}
                  onPress={() => handleReview(item.id)}
                  style={styles.reviewButton}
                >
                  {item.reviewed ? '重新复习' : '开始复习'}
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </>
      ) : currentMode === 'flashcard' ? (
        <Card style={styles.modeContentCard}>
          <Card.Content>
            <Text style={styles.modeSubtitle}>闪卡模式</Text>
            <View style={styles.flashcardContainer}>
              <Card style={styles.flashcard} onPress={handleFlipCard}>
                <Card.Content style={styles.flashcardContent}>
                  {!showAnswer ? (
                    <>
                      <Text style={styles.flashcardWord}>{reviewWords[currentWordIndex].word}</Text>
                      <Text style={styles.flashcardHint}>点击卡片查看答案</Text>
                    </>
                  ) : (
                    <>
                      <Text style={styles.flashcardWord}>{reviewWords[currentWordIndex].word}</Text>
                      <Text style={styles.flashcardPhonetic}>美: {reviewWords[currentWordIndex].phonetic.us}</Text>
                      <Text style={styles.flashcardPhonetic}>英: {reviewWords[currentWordIndex].phonetic.uk}</Text>
                      <Text style={styles.flashcardHint}>点击卡片返回</Text>
                    </>
                  )}
                </Card.Content>
              </Card>
            </View>
            <View style={styles.navigationButtons}>
              <Button 
                mode="outlined" 
                onPress={handlePreviousWord} 
                disabled={currentWordIndex === 0}
                style={styles.navButton}
              >
                上一个
              </Button>
              <Button 
                mode="contained" 
                onPress={handleNextWord}
                style={styles.navButton}
              >
                下一个
              </Button>
            </View>
          </Card.Content>
        </Card>
      ) : currentMode === 'dictation' ? (
        <Card style={styles.modeContentCard}>
          <Card.Content>
            <Text style={styles.modeSubtitle}>听写模式</Text>
            <View style={styles.dictationContainer}>
              <Text style={styles.dictationWord}>{reviewWords[currentWordIndex].word}</Text>
              <Text style={styles.dictationPhonetic}>美: {reviewWords[currentWordIndex].phonetic.us}</Text>
              <Text style={styles.dictationPhonetic}>英: {reviewWords[currentWordIndex].phonetic.uk}</Text>
              <Button 
                mode="contained" 
                style={styles.pronunciationButton}
                onPress={() => console.log('播放发音')}
              >
                播放发音
              </Button>
            </View>
            <View style={styles.navigationButtons}>
              <Button 
                mode="outlined" 
                onPress={handlePreviousWord} 
                disabled={currentWordIndex === 0}
                style={styles.navButton}
              >
                上一个
              </Button>
              <Button 
                mode="contained" 
                onPress={handleNextWord}
                style={styles.navButton}
              >
                下一个
              </Button>
            </View>
          </Card.Content>
        </Card>
      ) : currentMode === 'quiz' ? (
        <Card style={styles.modeContentCard}>
          <Card.Content>
            <Text style={styles.modeSubtitle}>选择题模式</Text>
            <View style={styles.quizContainer}>
              <Text style={styles.quizQuestion}>选择 "{reviewWords[currentWordIndex].word}" 的正确发音</Text>
              <View style={styles.quizOptions}>
                <Button 
                  mode="outlined" 
                  style={styles.quizOptionButton}
                  onPress={() => console.log('选择美式发音')}
                >
                  美式: {reviewWords[currentWordIndex].phonetic.us}
                </Button>
                <Button 
                  mode="outlined" 
                  style={styles.quizOptionButton}
                  onPress={() => console.log('选择英式发音')}
                >
                  英式: {reviewWords[currentWordIndex].phonetic.uk}
                </Button>
              </View>
            </View>
            <View style={styles.navigationButtons}>
              <Button 
                mode="outlined" 
                onPress={handlePreviousWord} 
                disabled={currentWordIndex === 0}
                style={styles.navButton}
              >
                上一个
              </Button>
              <Button 
                mode="contained" 
                onPress={handleNextWord}
                style={styles.navButton}
              >
                下一个
              </Button>
            </View>
          </Card.Content>
        </Card>
      ) : null
      }

      <Card style={styles.statsCard}>
        <Card.Content>
          <Title style={styles.statsTitle}>复习统计</Title>
          <Text style={styles.statsText}>今日复习: {reviewWords.filter(w => w.reviewed).length} 个</Text>
          <Text style={styles.statsText}>掌握率: 85%</Text>
          <Text style={styles.statsText}>连续复习: 3天</Text>
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
  progressCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressPercentage: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'right',
    marginTop: 4,
  },
  modeCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  modeTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  modeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modeButton: {
    flex: 1,
    margin: 4,
    minWidth: '30%',
  },
  wordCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  wordText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  reviewStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  reviewButton: {
    marginVertical: 8,
  },
  statsCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  statsTitle: {
    fontSize: 18,
    color: '#333',
  },
  statsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  modeContentCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  modeSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  flashcardContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  flashcard: {
    width: '90%',
    elevation: 4,
  },
  flashcardContent: {
    padding: 30,
    alignItems: 'center',
  },
  flashcardWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  flashcardPhonetic: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  flashcardHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 16,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  dictationContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  dictationWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  dictationPhonetic: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  pronunciationButton: {
    marginTop: 16,
  },
  quizContainer: {
    marginVertical: 20,
  },
  quizQuestion: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  quizOptions: {
    marginVertical: 16,
  },
  quizOptionButton: {
    marginVertical: 8,
  },
});
