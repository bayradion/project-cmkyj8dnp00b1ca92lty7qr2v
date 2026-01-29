import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Book } from '../types';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import { useBookStore } from '../store/bookStore';

interface Props {
  book: Book;
  onPress: () => void;
  style?: any;
}

export default function BookCard({ book, onPress, style }: Props) {
  const { toggleFavorite } = useBookStore();

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(book.id);
  };

  return (
    <View style={[styles.container, { backgroundColor: book.coverColor }, style]}>
      <View style={styles.wrapper}>
        <Pressable onPress={onPress} style={styles.pressable}>
          <View style={styles.content}>
            {/* Book Cover */}
            <View style={styles.coverContainer}>
              <Text style={styles.emoji}>{book.emoji}</Text>
              <View style={styles.favoriteButton}>
                <View style={styles.favoriteButtonBackground}>
                  <Pressable onPress={handleFavoritePress} style={styles.favoriteButtonInner}>
                    <Ionicons
                      name={book.isFavorite ? "heart" : "heart-outline"}
                      size={20}
                      color={book.isFavorite ? colors.error : colors.textLight}
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Book Info */}
            <View style={styles.infoContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {book.title}
              </Text>
              <Text style={styles.author} numberOfLines={1}>
                {book.author}
              </Text>
              <View style={styles.ageContainer}>
                <Text style={styles.ageText}>{book.ageRange}</Text>
              </View>
              <View style={styles.pagesContainer}>
                <Ionicons name="book-outline" size={16} color={colors.textLight} />
                <Text style={styles.pagesText}>
                  {book.pages.length} стр.
                </Text>
              </View>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  wrapper: {
    flex: 1,
  },
  pressable: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    minHeight: 200,
  },
  coverContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
    position: 'relative',
  },
  emoji: {
    fontSize: 60,
    marginBottom: spacing.sm,
  },
  favoriteButton: {
    position: 'absolute',
    top: -spacing.sm,
    right: -spacing.sm,
  },
  favoriteButtonBackground: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  favoriteButtonInner: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  author: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  ageContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'center',
    marginBottom: spacing.sm,
  },
  ageText: {
    fontSize: fontSize.xs,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  pagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  pagesText: {
    fontSize: fontSize.xs,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: spacing.xs,
  },
});