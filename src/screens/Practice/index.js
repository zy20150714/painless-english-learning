import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Title, Text, Card, Button, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

// 导入AI API服务
import { callGLM47API } from '../../services/api/glm47';

export default function PracticeScreen() {
  const navigation = useNavigation();
  const [currentTab, setCurrentTab] = useState('phrase');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiContent, setAiContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');

  const tabs = [
    { id: 'phrase', label: '短语搭配' },
    { id: 'synonym', label: '同义词/反义词' },
    { id: 'root', label: '词根词缀' },
    { id: 'related', label: '相关词汇' },
  ];

  const handleGenerateContent = async () => {
    if (!selectedWord) {
      alert('请先输入单词！');
      return;
    }

    setLoading(true);
    setAiContent(null);

    try {
      let prompt = '';
      
      switch (currentTab) {
        case 'phrase':
          prompt = `为单词 "${selectedWord}" 生成5个常用短语搭配，每个短语搭配包含中文翻译和例句。`;
          break;
        case 'synonym':
          prompt = `为单词 "${selectedWord}" 生成5个同义词和5个反义词，每个词包含中文翻译。`;
          break;
        case 'root':
          prompt = `分析单词 "${selectedWord}" 的词根词缀，解释其构成，并生成相关词汇。`;
          break;
        case 'related':
          prompt = `为单词 "${selectedWord}" 生成10个相关词汇，每个词包含中文翻译和简短解释。`;
          break;
      }

      const result = await callGLM47API(prompt);
      setAiContent(result);
    } catch (error) {
      console.error('AI API调用失败:', error);
      alert('AI生成内容失败，请检查网络连接或API密钥配置。');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSelectedWord(searchQuery.trim());
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>专项练习</Title>
        <Text style={styles.subtitle}>通过不同类型的练习提高英语水平</Text>
      </View>

      {/* 搜索栏 */}
      <Card style={styles.searchCard}>
        <Card.Content>
          <Text style={styles.searchLabel}>输入单词</Text>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder="例如: painless"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchBar}
              onSubmitEditing={handleSearch}
            />
            <Button
              mode="contained"
              style={styles.searchButton}
              onPress={handleSearch}
            >
              搜索
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* 标签切换 */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            mode={currentTab === tab.id ? "contained" : "outlined"}
            style={[styles.tabButton, currentTab === tab.id && styles.tabButtonActive]}
            labelStyle={styles.tabButtonLabel}
            onPress={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </View>

      {/* 生成内容按钮 */}
      {selectedWord && (
        <Card style={styles.generateCard}>
          <Card.Content>
            <Text style={styles.generateLabel}>为单词 "{selectedWord}" 生成内容</Text>
            <Button
              mode="contained"
              style={styles.generateButton}
              onPress={handleGenerateContent}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="white" size="small" />
                  <Text style={styles.loadingText}>AI正在生成...</Text>
                </View>
              ) : (
                '生成内容'
              )}
            </Button>
            {loading && (
              <Text style={styles.loadingHint}>AI正在生成相关内容，请稍候...</Text>
            )}
          </Card.Content>
        </Card>
      )}

      {/* AI生成的内容 */}
      {aiContent && (
        <Card style={styles.contentCard}>
          <Card.Content>
            <Text style={styles.contentTitle}>AI生成内容</Text>
            <Text style={styles.contentText}>{aiContent}</Text>
          </Card.Content>
        </Card>
      )}

      {/* 练习示例 */}
      <Card style={styles.exampleCard}>
        <Card.Content>
          <Text style={styles.exampleTitle}>练习示例</Text>
          <View style={styles.exampleButtons}>
            <Button
              mode="outlined"
              style={styles.exampleButton}
              onPress={() => {
                setSelectedWord('painless');
                setCurrentTab('phrase');
              }}
            >
              短语搭配示例
            </Button>
            <Button
              mode="outlined"
              style={styles.exampleButton}
              onPress={() => {
                setSelectedWord('example');
                setCurrentTab('synonym');
              }}
            >
              同义词示例
            </Button>
            <Button
              mode="outlined"
              style={styles.exampleButton}
              onPress={() => {
                setSelectedWord('vaccination');
                setCurrentTab('root');
              }}
            >
              词根词缀示例
            </Button>
          </View>
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
  searchCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  searchLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
    elevation: 0,
  },
  searchButton: {
    justifyContent: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  tabButtonActive: {
    backgroundColor: '#4CAF50',
  },
  tabButtonLabel: {
    fontSize: 12,
  },
  generateCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  generateLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  generateButton: {
    paddingVertical: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginLeft: 8,
  },
  loadingHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
  contentCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  contentText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  exampleCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  exampleTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  exampleButtons: {
    flexDirection: 'column',
    gap: 8,
  },
  exampleButton: {
    marginVertical: 4,
  },
});
