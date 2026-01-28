import { create } from 'zustand';
import { Book, BookStore } from '../types';

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Приключения Маленького Медвежонка',
    author: 'Анна Сказочникова',
    coverColor: '#FFB6C1',
    emoji: '🐻',
    ageRange: '3-6 лет',
    pages: [
      {
        id: '1-1',
        text: 'Жил-был маленький медвежонок по имени Мишка. Он очень любил мёд и приключения!',
        illustration: '🐻🍯',
        backgroundColor: '#FFE4E6'
      },
      {
        id: '1-2',
        text: 'Однажды утром Мишка проснулся и увидел за окном красивую радугу.',
        illustration: '🌈☀️',
        backgroundColor: '#E6F3FF'
      },
      {
        id: '1-3',
        text: 'Он решил отправиться в путешествие, чтобы найти конец радуги.',
        illustration: '🐻🚶‍♂️🌈',
        backgroundColor: '#F0FFE6'
      }
    ]
  },
  {
    id: '2',
    title: 'Волшебная Бабочка',
    author: 'Елена Добрая',
    coverColor: '#DDA0DD',
    emoji: '🦋',
    ageRange: '4-7 лет',
    pages: [
      {
        id: '2-1',
        text: 'В волшебном саду жила прекрасная бабочка с разноцветными крылышками.',
        illustration: '🦋🌺🌸',
        backgroundColor: '#F0E6FF'
      },
      {
        id: '2-2',
        text: 'Каждый день она помогала цветам распускаться своим волшебством.',
        illustration: '🦋✨🌻',
        backgroundColor: '#FFE6F0'
      }
    ]
  },
  {
    id: '3',
    title: 'Космическое Путешествие',
    author: 'Иван Звёздный',
    coverColor: '#87CEEB',
    emoji: '🚀',
    ageRange: '5-8 лет',
    pages: [
      {
        id: '3-1',
        text: 'Маленький космонавт Петя построил ракету и полетел к звёздам.',
        illustration: '👨‍🚀🚀🌟',
        backgroundColor: '#E6F0FF'
      },
      {
        id: '3-2',
        text: 'В космосе он встретил дружелюбного инопланетянина.',
        illustration: '👽🛸✨',
        backgroundColor: '#F0E6FF'
      }
    ]
  },
  {
    id: '4',
    title: 'Сказка о Доброй Рыбке',
    author: 'Мария Морская',
    coverColor: '#20B2AA',
    emoji: '🐠',
    ageRange: '3-6 лет',
    pages: [
      {
        id: '4-1',
        text: 'В глубоком синем море жила золотая рыбка, которая исполняла желания.',
        illustration: '🐠🌊💫',
        backgroundColor: '#E6F7FF'
      }
    ]
  }
];

export const useBookStore = create<BookStore>((set, get) => ({
  books: mockBooks,
  favoriteBooks: [],
  
  toggleFavorite: (bookId: string) => set((state) => {
    const book = state.books.find(b => b.id === bookId);
    if (!book) return state;

    const isFavorite = state.favoriteBooks.some(b => b.id === bookId);
    
    return {
      favoriteBooks: isFavorite 
        ? state.favoriteBooks.filter(b => b.id !== bookId)
        : [...state.favoriteBooks, { ...book, isFavorite: true }],
      books: state.books.map(b => 
        b.id === bookId ? { ...b, isFavorite: !isFavorite } : b
      )
    };
  }),
  
  getBookById: (bookId: string) => {
    const state = get();
    return state.books.find(book => book.id === bookId);
  }
}));