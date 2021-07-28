export interface Movie {
  [index: string]: any;
  id: number;
  imdbId: string;
  title: string;
  language: string;
  location: string;
  plot: string;
  poster: string;
  soundEffects: string[];
  stills: string[];
  listingType: string;
  imdbRating: string;
}
