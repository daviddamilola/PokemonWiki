import router from "next/router";
import * as React from "react";
import { useRouter } from "next/router";
import { IPokemonDetail } from "../interfaces";

type ListDetailProps = {
  item: IPokemonDetail;
};

const ListDetail = ({ item: pokemon }: ListDetailProps) => {
  const rotuer = useRouter();
  const handleGoBack = () => {
    router.back();
  }
  
  return (
    <div className="pokemon-detail">
      <div className="flex justify-self-start mt-4 ml-4 "><button type="button" onClick={handleGoBack} className="bg-black text-white px-4">{'<'} Back</button></div>
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
        <p className="mb-2">
          {" "}
          <span className="font-extrabold underline">ID:</span> {pokemon.id}
        </p>
        <p className="mb-2">
          <span className="font-extrabold underline">Name:</span> {pokemon.name}
        </p>
        {/* <p className="mb-2">Species: {pokemon.species}</p> */}
        <p className="mb-2">
          <span className="font-extrabold underline">Weights:</span> {pokemon.weight}
        </p>
        <p className="mb-2">
          <span className="font-extrabold underline">Moves:</span>{" "}
          {pokemon.moves.join(", ")}
        </p>
        <p className="mb-2">
          <span className="font-extrabold underline">Types:</span>{" "}
          {pokemon.types.join(", ")}
        </p>
        <div className="mt-5">
          {pokemon.stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <label>{stat.name}:</label>
              <progress className="" id={`${stat.name}`} value={stat.value} max="100">
                {" "}
                {stat.value}{" "}
              </progress>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
