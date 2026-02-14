import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Title, Text, Card, Button, Searchbar, Chip } from 'react-native-paper';

export default function ResourceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState(null);
  const [wordBookSearchQuery, setWordBookSearchQuery] = useState('');
  const [wordBookWords, setWordBookWords] = useState([
    { id: 1, word: 'painless', category: 'daily life', level: 'basic' },
    { id: 2, word: 'example', category: 'daily life', level: 'basic' },
    { id: 3, word: 'vaccination', category: 'daily life', level: 'intermediate' },
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const [wordBookResults, setWordBookResults] = useState([]);

  const categories = ['all', 'business', 'travel', 'technology', 'daily life'];
  const levels = ['all', 'basic', 'intermediate', 'advanced'];

  const wordList = [
    { id: 1, word: 'painless', category: 'daily life', level: 'basic' },
    { id: 2, word: 'example', category: 'daily life', level: 'basic' },
    { id: 3, word: 'vaccination', category: 'daily life', level: 'intermediate' },
    { id: 4, word: 'difficult', category: 'daily life', level: 'basic' },
    { id: 5, word: 'unpleasant', category: 'daily life', level: 'intermediate' },
    { id: 6, word: 'technology', category: 'technology', level: 'basic' },
    { id: 7, word: 'business', category: 'business', level: 'basic' },
    { id: 8, word: 'travel', category: 'travel', level: 'basic' },
  ];

  const filteredWords = wordList.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || word.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const handleSyncWordDatabase = async () => {
    setSyncing(true);
    setSyncResult(null);

    try {
      // 模拟同步过程
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 模拟同步成功
      setSyncResult({
        success: true,
        message: '词库同步成功！已更新10个新单词。'
      });
    } catch (error) {
      // 模拟同步失败
      setSyncResult({
        success: false,
        message: '词库同步失败，请检查网络连接后重试。'
      });
      console.error('同步词库失败:', error);
    } finally {
      setSyncing(false);

      // 3秒后清除结果提示
      setTimeout(() => {
        setSyncResult(null);
      }, 3000);
    }
  };

  const handleSearchAllWords = () => {
    if (searchQuery.trim()) {
      const results = wordList.filter(word => 
        word.word.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      // 可以在这里添加导航到搜索结果页面的逻辑
    }
  };

  const handleSearchWordBook = () => {
    if (wordBookSearchQuery.trim()) {
      const results = wordBookWords.filter(word => 
        word.word.toLowerCase().includes(wordBookSearchQuery.toLowerCase())
      );
      setWordBookResults(results);
      // 可以在这里添加导航到单词本搜索结果页面的逻辑
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>资源库</Title>
        <Text style={styles.subtitle}>管理和查看你的单词库</Text>
      </View>

      {/* 白色搜索框：支持所有单词搜索 */}
      <Card style={styles.searchCard}>
        <Card.Content>
          <Text style={styles.searchLabel}>搜索所有单词</Text>
          <Searchbar
            placeholder="输入单词..."
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            inputStyle={styles.searchInput}
            onSubmitEditing={handleSearchAllWords}
          />
        </Card.Content>
      </Card>

      {/* 绿色搜索框：仅搜索已添加到单词本中的单词 */}
      <Card style={styles.searchCard}>
        <Card.Content>
          <Text style={styles.searchLabel}>搜索单词本</Text>
          <Searchbar
            placeholder="输入单词..."
            onChangeText={setWordBookSearchQuery}
            value={wordBookSearchQuery}
            style={[styles.searchBar, styles.wordBookSearchBar]}
            inputStyle={[styles.searchInput, styles.wordBookSearchInput]}
            iconColor="#4CAF50"
            onSubmitEditing={handleSearchWordBook}
          />
        </Card.Content>
      </Card>

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>分类</Text>
        <View style={styles.chipContainer}>
          {categories.map((category) => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.chip}
            >
              {category === 'all' ? '全部' : category}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>难度</Text>
        <View style={styles.chipContainer}>
          {levels.map((level) => (
            <Chip
              key={level}
              selected={selectedLevel === level}
              onPress={() => setSelectedLevel(level)}
              style={styles.chip}
            >
              {level === 'all' ? '全部' : level}
            </Chip>
          ))}
        </View>
      </View>

      <Card style={styles.wordListCard}>
        <Card.Content>
          <Text style={styles.wordListTitle}>单词列表</Text>
          <FlatList
            data={filteredWords}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.wordItem}>
                <Text style={styles.wordItemText}>{item.word}</Text>
                <View style={styles.wordItemMeta}>
                  <Chip style={styles.wordItemChip}>{item.category}</Chip>
                  <Chip style={styles.wordItemChip}>{item.level}</Chip>
                </View>
              </View>
            )}
            style={styles.wordList}
          />
        </Card.Content>
      </Card>

      <Card style={styles.pronunciationCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>发音库</Text>
          <Text style={styles.cardText}>点击单词播放发音</Text>
          <Button mode="contained" style={styles.pronunciationButton}>
            播放全部发音
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.expandCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>拓展资源</Text>
          <Button mode="outlined" style={styles.expandButton}>
            短语搭配
          </Button>
          <Button mode="outlined" style={styles.expandButton}>
            同义词/反义词
          </Button>
          <Button mode="outlined" style={styles.expandButton}>
            词根词缀
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.syncCard}>
        <Card.Content>
          <Text style={styles.cardTitle}>词库同步</Text>
          <Text style={styles.syncHint}>同步最新词库，获取更多学习内容</Text>
          <Button 
            mode="contained" 
            style={styles.syncButton}
            onPress={handleSyncWordDatabase}
            disabled={syncing}
          >
            {syncing ? (
              <View style={styles.syncingContainer}>
                <ActivityIndicator color="white" size="small" />
                <Text style={styles.syncingText}>同步中...</Text>
              </View>
            ) : (
              '同步词库'
            )}
          </Button>
          {syncResult && (
            <Text style={[styles.syncResult, syncResult.success ? styles.syncSuccess : styles.syncError]}>
              {syncResult.message}
            </Text>
          )}
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
  searchBar: {
    elevation: 0,
    backgroundColor: '#F5F5F5',
    height: 56,
  },
  wordBookSearchBar: {
    backgroundColor: '#E8F5E9',
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  wordBookSearchInput: {
    color: '#2E7D32',
  },
  searchLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  filterContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  wordListCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  wordListTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  wordList: {
    maxHeight: 300,
  },
  wordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  wordItemText: {
    fontSize: 16,
    color: '#333',
  },
  wordItemMeta: {
    flexDirection: 'row',
  },
  wordItemChip: {
    marginLeft: 8,
  },
  pronunciationCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  expandCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  pronunciationButton: {
    marginTop: 8,
  },
  expandButton: {
    marginVertical: 4,
  },
  syncCard: {
    margin: 16,
    borderRadius: 12,
    elevation: 2,
  },
  syncHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  syncButton: {
    paddingVertical: 8,
  },
  syncingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncingText: {
    color: 'white',
    marginLeft: 8,
  },
  syncResult: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  syncSuccess: {
    color: '#4CAF50',
  },
  syncError: {
    color: '#F44336',
  },
});
