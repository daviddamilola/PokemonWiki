import * as React from "react";
import PokemonListItem from "./PokemonListItem";
import { PokemonDetail } from "../interfaces";

type Props = {
  items: PokemonDetail[];
};

const PokemonList = ({ items }: Props) => (
  <div>
    <ul className="pokemon-list">
      {items.map((item) => (
        <li className="pokemon-list-item">
          <PokemonListItem key={item.id} data={item} />
        </li>
      ))}
    </ul>
    <div className="flex justify-center items-center">
      <button className="pagination__btn"> {'<'} </button> 
      <span className="ml-2"> Page </span>
      <span className="ml-2"> 1 </span>
      <span className="ml-2"> Of </span>
      <span className="ml-2"> Page </span>
      <button className="pagination__btn ml-2"> {'>'} </button>
    </div>
  </div>

);

export default PokemonList;
