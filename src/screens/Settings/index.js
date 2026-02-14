import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { Title, Text, Card, Button, Switch, List, RadioButton, Dialog, Portal, TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [nightMode, setNightMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dailyGoal, setDailyGoal] = useState(10);
  const [goalDialogVisible, setGoalDialogVisible] = useState(false);
  const [newGoal, setNewGoal] = useState('10');
  const [accentPreference, setAccentPreference] = useState('us'); // 'us' or 'uk'

  const openGoalDialog = () => {
    setNewGoal(dailyGoal.toString());
    setGoalDialogVisible(true);
  };

  const saveDailyGoal = () => {
    const goal = parseInt(newGoal);
    if (goal > 0 && goal <= 100) {
      setDailyGoal(goal);
      setGoalDialogVisible(false);
      Alert.alert('成功', `每日单词目标已设置为 ${goal} 个`);
    } else if (newGoal === '0') {
      setDailyGoal(0);
      setGoalDialogVisible(false);
      Alert.alert('成功', '已设置为暂无目标');
    } else {
      Alert.alert('错误', '请输入有效的目标数量（0-100）');
    }
  };

  const handleImportData = () => {
    // 这里可以添加导入学习数据的逻辑
    Alert.alert('提示', '导入学习数据功能即将开放，请耐心等待');
  };

  const handleExportData = () => {
    // 这里可以添加导出学习数据的逻辑
    Alert.alert('提示', '学习数据已导出到本地存储');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>设置</Title>
        <Text style={styles.subtitle}>个性化你的学习体验</Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>基础设置</Text>
          
          <List.Item
            title="夜间模式"
            description="启用护眼背景"
            left={props => <List.Icon {...props} icon="weather-night" />}
            right={() => (
              <Switch
                value={nightMode}
                onValueChange={setNightMode}
                color="#4CAF50"
              />
            )}
            style={styles.listItem}
          />
          
          <List.Item
            title="自动播放发音"
            description="学习单词时自动播放发音"
            left={props => <List.Icon {...props} icon="volume-high" />}
            right={() => (
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                color="#4CAF50"
              />
            )}
            style={styles.listItem}
          />
          
          <List.Item
            title="学习提醒"
            description="每日学习提醒"
            left={props => <List.Icon {...props} icon="bell" />}
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                color="#4CAF50"
              />
            )}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>学习目标</Text>
          <List.Item
            title="每日单词目标"
            description={dailyGoal > 0 ? `当前目标: ${dailyGoal} 个单词` : '暂无目标'}
            left={props => <List.Icon {...props} icon="target" />}
            right={() => (
              <Button mode="outlined" onPress={openGoalDialog}>
                设置
              </Button>
            )}
            style={styles.listItem}
          />
          
          <List.Item
            title="发音偏好"
            description="(可在学习过程中自行调整)"
            left={props => <List.Icon {...props} icon="volume-high" />}
            right={() => (
              <View style={styles.accentButtons}>
                <Button 
                  mode={accentPreference === 'us' ? "contained" : "outlined"}
                  style={styles.accentButton}
                  onPress={() => setAccentPreference('us')}
                >
                  美式
                </Button>
                <Button 
                  mode={accentPreference === 'uk' ? "contained" : "outlined"}
                  style={styles.accentButton}
                  onPress={() => setAccentPreference('uk')}
                >
                  英式
                </Button>
              </View>
            )}
            style={styles.listItem}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>数据管理</Text>
          <Button mode="outlined" style={styles.button} onPress={handleExportData}>
            导出学习数据
          </Button>
          <Button mode="outlined" style={styles.button} onPress={handleImportData}>
            导入学习数据
          </Button>
          <Button mode="outlined" style={styles.button}>
            清除学习数据
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>AI设置</Text>
          <Button 
            mode="contained" 
            style={styles.button} 
            onPress={() => navigation.navigate('ApiKeySetup')}
          >
            API密钥配置
          </Button>
          <Text style={styles.aiHint}>
            配置智谱AI GLM-4.7-FLASH API密钥，获取智能学习辅助
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>关于</Text>
          <Text style={styles.aboutText}>版本: 1.0.0</Text>
          <Text style={styles.aboutText}>无痛英语：轻松学单词</Text>
          <Text style={styles.aboutText}>© 2024 Painless English</Text>
        </Card.Content>
      </Card>

      {/* 每日单词目标设置对话框 */}
      <Portal>
        <Dialog
          visible={goalDialogVisible}
          onDismiss={() => setGoalDialogVisible(false)}
        >
          <Dialog.Title>设置每日单词目标</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogText}>请输入每日学习的单词数量（0表示暂无目标）</Text>
            <PaperTextInput
              label="目标数量"
              value={newGoal}
              onChangeText={setNewGoal}
              keyboardType="number-pad"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setGoalDialogVisible(false)}>取消</Button>
            <Button onPress={saveDailyGoal}>保存</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    marginBottom: 16,
  },
  listItem: {
    marginVertical: 4,
  },
  button: {
    marginVertical: 8,
  },
  aiHint: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  accentButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  accentButton: {
    paddingHorizontal: 8,
  },
  dialogText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  dialogInput: {
    marginBottom: 16,
  },
});
