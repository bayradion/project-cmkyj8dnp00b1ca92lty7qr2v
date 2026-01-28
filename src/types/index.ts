export interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  emoji: string;
  ageRange: string;
  pages: BookPage[];
  isFavorite?: boolean;
}

export interface BookPage {
  id: string;
  text: string;
  illustration: string;
  backgroundColor: string;
}

export type RootStackParamList = {
  Home: undefined;
  BookList: undefined;
  BookReader: { bookId: string };
  Favorites: undefined;
};

export interface BookStore {
  books: Book[];
  favoriteBooks: Book[];
  toggleFavorite: (bookId: string) => void;
  getBookById: (bookId: string) => Book | undefined;
}