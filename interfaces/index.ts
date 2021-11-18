// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export interface PokemonDetail {
  name: string;
  id: number;
  imageUrl: string;
  species: string;
  types: string[];
  stats: {[key: string]: number}[];
  weight: number;
  height: number;
  moves: string[];
}

export interface PokemonResult {
  name: string;
  url: string;
}

