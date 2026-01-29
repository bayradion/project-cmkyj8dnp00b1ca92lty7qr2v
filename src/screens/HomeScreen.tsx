import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
import BookCard from '../components/BookCard';
import { useBookStore } from '../store/bookStore';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  const { books, favoriteBooks } = useBookStore();
  const featuredBooks = books.slice(0, 3);

  const menuItems = [
    {
      id: '1',
      title: 'Все Книги',
      emoji: '📚',
      color: colors.blue,
      onPress: () => navigation.navigate('BookList')
    },
    {
      id: '2',
      title: 'Любимые',
      emoji: '⭐',
      color: colors.pink,
      onPress: () => navigation.navigate('Favorites')
    }
  ];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.container}
      >
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.welcomeText}>Привет, маленький читатель! 👋</Text>
              <Text style={styles.titleText}>Детские Книжки</Text>
              <Text style={styles.subtitleText}>Волшебные истории ждут тебя</Text>
            </View>
          </View>

          {/* Menu Cards */}
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuCard, { backgroundColor: item.color }]}
                onPress={item.onPress}
              >
                <Text style={styles.menuEmoji}>{item.emoji}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <View style={styles.menuArrow}>
                  <Ionicons name="star" size={24} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Featured Books */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>🌟 Рекомендуем</Text>
              <TouchableOpacity onPress={() => navigation.navigate('BookList')}>
                <Text style={styles.seeAllText}>Все книги →</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={{ flex: 1 }}
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.booksScrollContainer}
            >
              {featuredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onPress={() => navigation.navigate('BookReader', { bookId: book.id })}
                  style={styles.bookCard}
                />
              ))}
            </ScrollView>
          </View>

          {/* Stats */}
          {favoriteBooks.length > 0 && (
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statEmoji}>⭐</Text>
                <Text style={styles.statNumber}>{favoriteBooks.length}</Text>
                <Text style={styles.statLabel}>Любимых книг</Text>
              </View>
            </View>
          )}

          <View style={styles.bottomPadding} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: spacing.xxl + 20,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerContent: {
    alignItems: 'center' as const,
  },
  welcomeText: {
    fontSize: fontSize.md,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  titleText: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
    textAlign: 'center' as const,
    marginBottom: spacing.xs,
  },
  subtitleText: {
    fontSize: fontSize.lg,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center' as const,
  },
  menuContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  menuCard: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  menuEmoji: {
    fontSize: fontSize.xxxl,
    marginRight: spacing.md,
  },
  menuTitle: {
    flex: 1,
    fontSize: fontSize.xl,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
  },
  menuArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold' as const,
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: fontSize.md,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  booksScrollContainer: {
    paddingHorizontal: spacing.lg,
  },
  bookCard: {
    marginRight: spacing.md,
    width: width * 0.7,
  },
  statsContainer: {
    paddingHorizontal: spacing.lg,
    alignItems: 'center' as const,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  statEmoji: {
    fontSize: fontSize.xxxl,
    marginBottom: spacing.sm,
  },
  statNumber: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold' as const,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.md,
    color: colors.textLight,
  },
  bottomPadding: {
    height: spacing.xl,
  },
};