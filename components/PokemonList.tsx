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
        <li key={item.id} className="pokemon-list-item">
          <PokemonListItem data={item} />
        </li>
      ))}
    </ul>
  </div>

);

export default PokemonList;
