import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import api from "../../services/initApi";

type Props = {
  pokemonsForPage: any[];
  errors: any[];
};

const PokemonPage = ({ pokemonsForPage, errors }: Props) => {
  if (errors) {
    return (
      <div className="w-full h-screen">
        <h1>Something went wrong!</h1>
        <ul>
          {errors.map((error: any) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <div className="w-full h-screen">
      <h1>Pokemons</h1>
  </div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pagination = await api.pokemonService.getPagePokemonPagination();

  const paths = pagination.map((page) => ({
    params: { page: page.pageNumber },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const pokemonsForPage = await api.pokemonService.getPagePokemons(
      params?.page ?? 1
    );
    console.log("pokemonsForPage", pokemonsForPage);
    
    return { props: { pokemonsForPage } };
  } catch (error) {
    return { props: { errors: "Network error" } };
  }
};


export default PokemonPage;