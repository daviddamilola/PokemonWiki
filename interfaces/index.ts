
export interface IPokemonDetail {
  name: string;
  id: number;
  imageUrl: string;
  species: {[key: string]: any};
  types: string[];
  stats: {[key: string]: number}[];
  weight: number;
  height: number;
  moves: string[];
}

export interface IPokemonResult {
  name: string;
  url: string;
}

export interface IPagination {
  currentPage: number,
  nextPage: number,
  previousPage: number,
  totalPages: number,
};


