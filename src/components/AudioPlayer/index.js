import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text, Card, Button } from 'react-native-paper';
import Sound from 'react-native-sound';

export default function AudioPlayer({ word, phoneticData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [accent, setAccent] = useState('us'); // 'us' for American, 'uk' for British
  const [phonetics, setPhonetics] = useState({
    us: phoneticData?.us || '',
    uk: phoneticData?.uk || ''
  });

  // 音频文件路径
  const getAudioPath = () => {
    return `https://api.dictionaryapi.dev/media/pronunciations/en/${word.toLowerCase()}/${accent}.mp3`;
  };

  const handlePlay = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play((success) => {
          if (success) {
            console.log('音频播放成功');
          } else {
            console.log('音频播放失败');
          }
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    } else {
      // 创建新的Sound实例
      const newSound = new Sound(getAudioPath(), null, (error) => {
        if (error) {
          console.log('音频加载失败:', error);
          return;
        }
        setSound(newSound);
        newSound.play((success) => {
          if (success) {
            console.log('音频播放成功');
          } else {
            console.log('音频播放失败');
          }
          setIsPlaying(false);
        });
        setIsPlaying(true);
      });
    }
  };

  const handleSwitchAccent = () => {
    const newAccent = accent === 'us' ? 'uk' : 'us';
    setAccent(newAccent);
    setIsPlaying(false);
    setSound(null);
  };

  // 清理音频资源
  useEffect(() => {
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [sound]);

  // 当单词或发音类型改变时，重置音频
  useEffect(() => {
    setSound(null);
    setIsPlaying(false);
  }, [word, accent]);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.container}>
          <Text style={styles.title}>发音</Text>
          <View style={styles.controls}>
            <IconButton
              icon={isPlaying ? "pause-circle" : "play-circle"}
              size={48}
              color="#4CAF50"
              onPress={handlePlay}
            />
            <View>
              <Text style={styles.word}>{word}</Text>
              <View style={styles.phoneticContainer}>
                <Text style={[styles.phonetic, accent === 'us' && styles.phoneticActive]}>
                  美: {phonetics.us || '/未知/'}
                </Text>
                <Text style={[styles.phonetic, accent === 'uk' && styles.phoneticActive]}>
                  英: {phonetics.uk || '/未知/'}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              mode={accent === 'us' ? "contained" : "outlined"}
              style={styles.accentButton}
              labelStyle={styles.accentButtonLabel}
              onPress={() => setAccent('us')}
            >
              美式
            </Button>
            <Button
              mode={accent === 'uk' ? "contained" : "outlined"}
              style={styles.accentButton}
              labelStyle={styles.accentButtonLabel}
              onPress={() => setAccent('uk')}
            >
              英式
            </Button>
          </View>
          <View style={styles.controlsRow}>
            <IconButton
              icon="volume-high"
              size={24}
              color="#666"
              onPress={() => console.log('调整音量')}
            />
            <IconButton
              icon="repeat"
              size={24}
              color="#666"
              onPress={() => console.log('重复播放')}
            />
            <IconButton
              icon="swap-horizontal"
              size={24}
              color={accent === 'us' ? "#4CAF50" : "#666"}
              onPress={handleSwitchAccent}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  container: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  word: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  phoneticContainer: {
    marginTop: 4,
    marginLeft: 16,
  },
  phonetic: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  phoneticActive: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  accentButton: {
    marginHorizontal: 8,
    paddingHorizontal: 16,
  },
  accentButtonLabel: {
    fontSize: 14,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 32,
  },
});
