import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import api from "../../services/initApi";
import Link from "next/link";

type Props = {
  pokemonsForPage: any[];
  errors: any[];
};

const PokemonPage = ({ pokemonsForPage, errors }: Props) => {
  if (errors) {
    return (
      <div className="error_wrapper">
        <div className="container">
          <h1 className="text-2xl text-center">Something went wrong!</h1>
          <p className="text-center">
            <span className="error">Error is </span> : {errors}
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <button className="text-white rounded-lg px-2 py-2 text-base bg-blue-500">
                Refresh Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <h1>Pokemons</h1>
    </div>
  );
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

    return { props: { errors: pokemonsForPage } };
  } catch (error) {
    return { props: { errors: "Network error" } };
  }
};

export default PokemonPage;
