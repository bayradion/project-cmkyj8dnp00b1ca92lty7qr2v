import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Book } from '../types';
import { colors, spacing, fontSize } from '../constants/theme';
import BookCard from '../components/BookCard';
import { useBookStore } from '../store/bookStore';

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

interface Props {
  navigation: FavoritesScreenNavigationProp;
}

export default function FavoritesScreen({ navigation }: Props) {
  const { favoriteBooks } = useBookStore();

  const renderBookItem = ({ item, index }: { item: Book; index: number }) => (
    <BookCard
      book={item}
      onPress={() => navigation.navigate('BookReader', { bookId: item.id })}
      style={[
        styles.bookCard,
        index % 2 === 0 ? styles.leftCard : styles.rightCard
      ]}
    />
  );

  if (favoriteBooks.length === 0) {
    return (
      <View style={[styles.emptyContainer, { flex: 1 }]}>
        <Text style={styles.emptyEmoji}>💔</Text>
        <Text style={styles.emptyTitle}>Пока нет любимых книг</Text>
        <Text style={styles.emptySubtitle}>
          Читай книги и добавляй их в избранное, нажимая на сердечко ❤️
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>💖 Твои любимые книги</Text>
        <Text style={styles.subtitleText}>
          У тебя {favoriteBooks.length} любимых книг
        </Text>
      </View>
      
      <FlatList
        style={{ flex: 1 }}
        data={favoriteBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={favoriteBooks.length > 1 ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  headerText: {
    fontSize: fontSize.xl,
    fontWeight: 'bold' as const,
    color: colors.text,
    textAlign: 'center' as const,
    marginBottom: spacing.xs,
  },
  subtitleText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center' as const,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  row: {
    justifyContent: 'space-between' as const,
    paddingHorizontal: spacing.xs,
  },
  bookCard: {
    flex: 0.48,
    marginBottom: spacing.lg,
  },
  leftCard: {
    marginRight: spacing.xs,
  },
  rightCard: {
    marginLeft: spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xl,
  },
  emptyEmoji: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold' as const,
    color: colors.text,
    textAlign: 'center' as const,
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center' as const,
    lineHeight: fontSize.md * 1.5,
  },
};