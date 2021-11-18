import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import api from "../../services/initApi";
import Link from "next/link";
import PokemonList from "../../components/PokemonList";
import Layout from "../../components/Layout";

type Props = {
  pokemonsForPage: any;
  errors: any;
};

const PokemonPage = ({ pokemonsForPage, errors }: Props) => {
  if (errors) {
    return (
      <Layout>
 <div className="error_wrapper">
        <div className="container">
          <h1 className="text-2xl text-center">Something went wrong!</h1>
          <p className="text-center">
            <span className="error">Error is </span> : {errors}
          </p>
          <div className="flex justify-center">
            <Link href="/">
              <button className="mt-4 text-white outline-none px-2 py-2 text-base bg-black">
                Refresh Page
              </button>
            </Link>
          </div>
        </div>
      </div>
      </Layout>
     
    );
  }

  return (
    <Layout>
    <div className="w-full h-screen">
      <PokemonList items={pokemonsForPage.result} />
    </div>
    </Layout>
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

    return { props: { pokemonsForPage: pokemonsForPage } };
  } catch (error) {
    return { props: { errors: "Network error" } };
  }
};

export default PokemonPage;
