import duipengThangTei from '@/assets/duipeng-thang-tei.jpg';
import cathyRongmei from '@/assets/cathy-rongmei.jpg';
import ngaanSantampu from '@/assets/ngaan-santampu.jpg';

export interface SearchItem {
  id: number;
  title: string;
  type: 'movie' | 'series' | 'music';
  genre: string;
  language: string;
  poster: string;
  rating: number;
  year: number;
  route: string;
}

export const searchableContent: SearchItem[] = [
  {
    id: 1,
    title: 'Ngaan Santanpou',
    type: 'movie',
    genre: 'Romance',
    language: 'Tangkhul',
    poster: ngaanSantampu,
    rating: 4.5,
    year: 2025,
    route: '/premieres'
  },
  {
    id: 2,
    title: 'Duipeng Thang Tei',
    type: 'series',
    genre: 'Horror',
    language: 'Rongmei',
    poster: duipengThangTei,
    rating: 5.0,
    year: 2021,
    route: '/tv-series'
  },
  {
    id: 3,
    title: 'Cathy',
    type: 'movie',
    genre: 'Romance',
    language: 'Rongmei',
    poster: cathyRongmei,
    rating: 4.7,
    year: 2025,
    route: '/premieres'
  },
  {
    id: 4,
    title: 'Kiman Bhi Bhal',
    type: 'music',
    genre: 'Traditional',
    language: 'Nagamese',
    poster: ngaanSantampu,
    rating: 4.7,
    year: 2022,
    route: '/music'
  },
  {
    id: 5,
    title: 'Ngaan Santanpou',
    type: 'movie',
    genre: 'Romance',
    language: 'Rongmei',
    poster: ngaanSantampu,
    rating: 4.4,
    year: 2025,
    route: '/premieres'
  }
];
