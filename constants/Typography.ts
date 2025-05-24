import { TextStyle } from 'react-native';

export const Typography: Record<string, TextStyle> = {
  // Headers
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.1,
  },
  h5: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 22,
  },
  h6: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  
  // Body text
  body1: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  body2: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  
  // Special text styles
  button: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  subtitle1: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    lineHeight: 24,
  },
  subtitle2: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    lineHeight: 20,
  },
  overline: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
};

export default Typography;