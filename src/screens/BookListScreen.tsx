import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Book } from '../types';
import { colors, spacing, fontSize } from '../constants/theme';
import BookCard from '../components/BookCard';
import { useBookStore } from '../store/bookStore';

type BookListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookList'>;

interface Props {
  navigation: BookListScreenNavigationProp;
}

export default function BookListScreen({ navigation }: Props) {
  const { books } = useBookStore();

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>📚 Все наши книги</Text>
        <Text style={styles.subtitleText}>Выбери книгу для чтения</Text>
      </View>
      
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
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
};