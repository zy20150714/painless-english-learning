import { DefaultTheme } from 'react-native-paper';

// 自定义主题
export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#4CAF50',
    accent: '#2196F3',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    error: '#B00020',
    text: '#212121',
    onSurface: '#212121',
    disabled: '#BDBDBD',
    placeholder: '#9E9E9E',
    backdrop: 'rgba(0, 0, 0, 0.5)',
  },
  roundness: 12,
  fonts: {
    ...DefaultTheme.fonts,
  },
  animation: {
    ...DefaultTheme.animation,
    scale: 1.0,
  },
};

// 夜间模式主题
export const darkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#81C784',
    accent: '#64B5F6',
    background: '#121212',
    surface: '#1E1E1E',
    error: '#EF5350',
    text: '#FFFFFF',
    onSurface: '#FFFFFF',
    disabled: '#424242',
    placeholder: '#757575',
    backdrop: 'rgba(0, 0, 0, 0.8)',
  },
  roundness: 12,
  fonts: {
    ...DefaultTheme.fonts,
  },
  animation: {
    ...DefaultTheme.animation,
    scale: 1.0,
  },
};

// 响应式布局配置
export const responsive = {
  // 屏幕尺寸断点
  breakpoints: {
    small: 375,
    medium: 768,
    large: 1024,
  },
  
  // 根据屏幕宽度获取字体大小
  getFontSize: (baseSize, screenWidth) => {
    if (screenWidth < responsive.breakpoints.small) {
      return baseSize * 0.8;
    } else if (screenWidth > responsive.breakpoints.large) {
      return baseSize * 1.2;
    }
    return baseSize;
  },
  
  // 根据屏幕宽度获取间距
  getSpacing: (baseSpacing, screenWidth) => {
    if (screenWidth < responsive.breakpoints.small) {
      return baseSpacing * 0.8;
    } else if (screenWidth > responsive.breakpoints.large) {
      return baseSpacing * 1.2;
    }
    return baseSpacing;
  },
};

// 通用样式
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.placeholder,
    marginTop: 4,
  },
  card: {
    margin: 16,
    borderRadius: theme.roundness,
    elevation: 2,
  },
  button: {
    margin: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
