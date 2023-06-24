export {};

declare global {
  interface Movie {
    title: string;
    posterUrl: string;
    description: string;
    releaseYear: number;
    genre: string;
    id: string;
    rating: number;
    director: string;
    reviewIds: string[];
  }

  interface Cinema {
    id: string;
    name: string;
  }

  interface SearchState {
    title: string;
    genre: string;
    cinema: string;
  }

  interface SearchAction {
    type: string;
    payload: string;
  }
}
