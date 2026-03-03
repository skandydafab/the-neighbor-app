import { StyleSheet } from 'react-native';

export const Fonts = {
  title: 'DaVinci-Regular',
  titleMedium: 'DaVinci-Medium',
  titleSemiBold: 'DaVinci-SemiBold',
  titleItalic: 'DaVinci-Italic',
  body: 'GeistMono',
  headlandOne: 'HeadlandOne_400Regular',
};

export const TextStyles = {
  siteTitle: {
    fontFamily: Fonts.title,
    fontSize: 29,
    letterSpacing: 0.5,
  },
  
  sectionHeader: {
    fontFamily: Fonts.title,
    fontSize: 37,
    letterSpacing: -0.03 * 37,
    lineHeight: 37 * 1.1,
  },
  
  articleTitle: {
    fontFamily: Fonts.title,
    fontSize: 27,
    letterSpacing: -0.03 * 27,
    lineHeight: 32,
  },
  
  category: {
    fontFamily: Fonts.body,
    fontSize: 15,
    fontWeight: '700' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  
  body: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 14 * 1.2,
  },
  
  caption: {
    fontFamily: Fonts.titleItalic,
    fontSize: 18,
    lineHeight: 26,
  },
  
  author: {
    fontFamily: Fonts.body,
    fontSize: 14,
    fontWeight: '500' as const,
  },
};

export default { Fonts, TextStyles };
