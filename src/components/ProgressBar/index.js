import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';

export default function ProgressBar({ progress, total, label, color = '#4CAF50' }) {
  const progressAnim = React.useRef(new Animated.Value(0)).current;
  const percentage = total > 0 ? (progress / total) * 100 : 0;

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [percentage, progressAnim]);

  const widthPercentage = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.progressContainer}>
        <Animated.View 
          style={[
            styles.progressBar, 
            { 
              width: widthPercentage,
              backgroundColor: color 
            }
          ]} 
        />
      </View>
      <View style={styles.stats}>
        <Text style={styles.progressText}>{progress}/{total}</Text>
        <Text style={styles.percentageText}>{Math.round(percentage)}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  progressContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  percentageText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
});
