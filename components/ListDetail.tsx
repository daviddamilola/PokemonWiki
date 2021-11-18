import * as React from "react";

import { PokemonDetail } from "../interfaces";

type ListDetailProps = {
  item: PokemonDetail;
};

const ListDetail = ({ item: pokemon }: ListDetailProps) => {
  return (
    <div className="pokemon-detail">
      <div className="w-full pokemon-detail__container">
      <h1 className="text-center mt-8">Detail for {pokemon.name}</h1>
      <div className="w-full flex justify-center">
        <img
          width="150px"
          height="150px"
          src={pokemon?.imageUrl}
          alt="pokemon image"
        />
      </div>
      <p className="mb-2">ID: {pokemon.id}</p>
      <p className="mb-2">Name: {pokemon.name}</p>
      {/* <p className="mb-2">Species: {pokemon.species}</p> */}
      <p className="mb-2">Weights: {pokemon.weight}</p>
      <p className="mb-2">Moves: {pokemon.moves.join(', ')}</p>
      <p className="mb-2">Types: {pokemon.types.join(', ')}</p>
      <div className="mt-5">
    
      </div>
      </div>
    </div>
  );
};

export default ListDetail;
