// Main color palette
export const Colors = {
  primary: {
    default: '#FF8000',
    light: '#FFB266',
    dark: '#CC6600',
    background: '#FFF1E6',
  },
  secondary: {
    default: '#2A9D8F',
    light: '#4FBEB1',
    dark: '#227C71',
    background: '#E7F5F3',
  },
  accent: {
    default: '#E76F51',
    light: '#EC9278',
    dark: '#B85840',
    background: '#FBEEE9',
  },
  success: {
    default: '#4CAF50',
    light: '#7BC67E',
    dark: '#3D8C40',
    background: '#E8F5E9',
  },
  warning: {
    default: '#FF9800',
    light: '#FFBB4D',
    dark: '#CC7A00',
    background: '#FFF3E0',
  },
  error: {
    default: '#F44336',
    light: '#F77C72',
    dark: '#C3352B',
    background: '#FEE8E7',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Theme styles
export const theme = {
  text: {
    primary: Colors.neutral[900],
    secondary: Colors.neutral[700],
    tertiary: Colors.neutral[500],
    light: Colors.white,
    link: Colors.primary.default,
  },
  background: {
    primary: Colors.white,
    secondary: Colors.neutral[50],
    elevated: Colors.white,
    card: Colors.white,
  },
  border: {
    light: Colors.neutral[200],
    medium: Colors.neutral[300],
    dark: Colors.neutral[400],
  },
  shadow: {
    color: 'rgba(0, 0, 0, 0.1)',
  },
};

export default Colors;