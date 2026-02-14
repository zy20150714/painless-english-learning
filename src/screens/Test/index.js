import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Title, Text, Card, Button, RadioButton } from 'react-native-paper';

export default function TestScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: '选择 "painless" 的正确释义',
      options: [
        '引起疼痛的',
        '无痛的',
        '困难的',
        '愉快的'
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      type: 'fill-blank',
      question: 'The vaccination was ______, I hardly felt a thing.',
      options: ['painful', 'painless', 'difficult', 'easy'],
      correctAnswer: 1
    },
    {
      id: 3,
      type: 'translation',
      question: '翻译 "painless" 到中文',
      correctAnswer: '无痛的'
    }
  ];

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmitAnswer = () => {
    const currentQ = questions[currentQuestion];
    const userAnswer = answers[currentQ.id];
    
    if (userAnswer !== undefined) {
      if (userAnswer === currentQ.correctAnswer) {
        setScore(prev => prev + 1);
        // 显示正确反馈
        alert('回答正确！');
      } else {
        // 显示错误反馈
        alert(`回答错误！正确答案是: ${currentQ.options[currentQ.correctAnswer]}`);
      }
    } else {
      alert('请先选择答案！');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>测试</Title>
        <Text style={styles.subtitle}>共 {questions.length} 题，当前第 {currentQuestion + 1} 题</Text>
      </View>

      <Card style={styles.questionCard}>
        <Card.Content>
          <Text style={styles.questionText}>{questions[currentQuestion].question}</Text>
          
          {questions[currentQuestion].type === 'multiple-choice' && (
            <RadioButton.Group onValueChange={(value) => handleAnswer(questions[currentQuestion].id, parseInt(value))}>
              {questions[currentQuestion].options.map((option, index) => (
                <RadioButton.Item 
                  key={index}
                  label={option}
                  value={index.toString()}
                  style={styles.radioItem}
                  color="#4CAF50"
                />
              ))}
            </RadioButton.Group>
          )}

          {questions[currentQuestion].type === 'fill-blank' && (
            <RadioButton.Group onValueChange={(value) => handleAnswer(questions[currentQuestion].id, parseInt(value))}>
              {questions[currentQuestion].options.map((option, index) => (
                <RadioButton.Item 
                  key={index}
                  label={option}
                  value={index.toString()}
                  style={styles.radioItem}
                  color="#4CAF50"
                />
              ))}
            </RadioButton.Group>
          )}

          {questions[currentQuestion].type === 'translation' && (
            <View style={styles.translationContainer}>
              <Text style={styles.translationHint}>答案: {questions[currentQuestion].correctAnswer}</Text>
              <Button 
                mode="contained" 
                onPress={() => {
                  setScore(prev => prev + 1);
                  alert('回答正确！');
                }}
                style={styles.submitButton}
              >
                标记为正确
              </Button>
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.scoreCard}>
        <Card.Content>
          <Text style={styles.scoreText}>当前得分: {score}</Text>
          <Text style={styles.scorePercentage}>
            正确率: {(score / (currentQuestion + 1) * 100).toFixed(0)}%
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button 
          mode="contained" 
          style={styles.button} 
          onPress={handleSubmitAnswer}
          labelStyle={styles.buttonLabel}
        >
          提交答案
        </Button>
        <Button 
          mode="outlined" 
          style={styles.button} 
          onPress={handleNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
          labelStyle={styles.buttonLabel}
        >
          下一题
        </Button>
        {currentQuestion >= questions.length - 1 && (
          <Button 
            mode="outlined" 
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={() => {
              alert(`测试完成！\n总得分: ${score}/${questions.length}\n正确率: ${(score / questions.length * 100).toFixed(0)}%`);
            }}
          >
            查看结果
          </Button>
        )}
      </View>
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
  questionCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  radioItem: {
    marginVertical: 4,
  },
  translationContainer: {
    marginTop: 16,
  },
  translationHint: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  scoreCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  scoreText: {
    fontSize: 16,
    color: '#333',
  },
  scorePercentage: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 8,
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
