import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Book } from '../types';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { useBookStore } from '../store/bookStore';

type BookReaderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookReader'>;
type BookReaderScreenRouteProp = RouteProp<RootStackParamList, 'BookReader'>;

interface Props {
  navigation: BookReaderScreenNavigationProp;
  route: BookReaderScreenRouteProp;
}

const { width } = Dimensions.get('window');

export default function BookReaderScreen({ navigation, route }: Props) {
  const { bookId } = route.params;
  const { getBookById, toggleFavorite } = useBookStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  
  const book = getBookById(bookId);

  useEffect(() => {
    if (book) {
      navigation.setOptions({
        title: book.title,
        headerRight: () => (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(book.id)}
          >
            <Ionicons
              name={book.isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={book.isFavorite ? colors.error : "#FFFFFF"}
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [book, navigation, toggleFavorite]);

  if (!book) {
    return (
      <View style={[styles.errorContainer, { flex: 1 }]}>
        <Text style={styles.errorEmoji}>😕</Text>
        <Text style={styles.errorText}>Книга не найдена</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Назад</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentPage = book.pages[currentPageIndex];
  const isLastPage = currentPageIndex === book.pages.length - 1;
  const isFirstPage = currentPageIndex === 0;

  const goToNextPage = () => {
    if (!isLastPage) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPrevPage = () => {
    if (!isFirstPage) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <LinearGradient
        colors={[currentPage.backgroundColor, '#FFFFFF']}
        style={styles.pageContainer}
      >
        {/* Page Content */}
        <View style={styles.contentContainer}>
          <View style={styles.illustrationContainer}>
            <Text style={styles.illustration}>{currentPage.illustration}</Text>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.pageText}>{currentPage.text}</Text>
          </View>
        </View>

        {/* Page Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[
              styles.navButton,
              isFirstPage && styles.navButtonDisabled
            ]}
            onPress={goToPrevPage}
            disabled={isFirstPage}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={isFirstPage ? colors.textLight : colors.primary}
            />
            <Text style={[
              styles.navButtonText,
              isFirstPage && styles.navButtonTextDisabled
            ]}>
              Назад
            </Text>
          </TouchableOpacity>

          <View style={styles.pageIndicator}>
            <Text style={styles.pageNumber}>
              {currentPageIndex + 1} из {book.pages.length}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.navButton,
              isLastPage && styles.navButtonDisabled
            ]}
            onPress={goToNextPage}
            disabled={isLastPage}
          >
            <Text style={[
              styles.navButtonText,
              isLastPage && styles.navButtonTextDisabled
            ]}>
              {isLastPage ? 'Конец' : 'Далее'}
            </Text>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={isLastPage ? colors.textLight : colors.primary}
            />
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${((currentPageIndex + 1) / book.pages.length) * 100}%`
                }
              ]}
            />
          </View>
        </View>
      </LinearGradient>

      {/* Finish Button (only on last page) */}
      {isLastPage && (
        <View style={styles.finishContainer}>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.finishButtonText}>🎉 Молодец! Домой</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  favoriteButton: {
    marginRight: spacing.md,
    padding: spacing.xs,
  },
  pageContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  illustrationContainer: {
    flex: 0.4,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginBottom: spacing.xl,
  },
  illustration: {
    fontSize: 80,
    textAlign: 'center' as const,
  },
  textContainer: {
    flex: 0.3,
    justifyContent: 'center' as const,
    paddingHorizontal: spacing.md,
  },
  pageText: {
    fontSize: fontSize.xl,
    lineHeight: fontSize.xl * 1.6,
    textAlign: 'center' as const,
    color: colors.text,
    fontWeight: '500' as const,
  },
  navigationContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingVertical: spacing.lg,
  },
  navButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600' as const,
    color: colors.primary,
    marginHorizontal: spacing.xs,
  },
  navButtonTextDisabled: {
    color: colors.textLight,
  },
  pageIndicator: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.full,
  },
  pageNumber: {
    fontSize: fontSize.sm,
    fontWeight: '600' as const,
    color: colors.text,
  },
  progressBarContainer: {
    paddingVertical: spacing.md,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 3,
    overflow: 'hidden' as const,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  finishContainer: {
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  finishButton: {
    backgroundColor: colors.success,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  finishButtonText: {
    fontSize: fontSize.lg,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  errorEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  errorText: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold' as const,
    color: colors.text,
    textAlign: 'center' as const,
    marginBottom: spacing.lg,
  },
  backButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  backButtonText: {
    fontSize: fontSize.md,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
  },
};