import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import api from "../../services/initApi";
import Link from "next/link";
import PokemonList from "../../components/PokemonList";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

type Props = {
  pokemonsForPage: any;
  errors: any;
};

const PokemonPage = ({ pokemonsForPage, errors }: Props) => {
  const router = useRouter();

  const handleNextPageClick = () => {
    router.push(`/pokemons/${Number(router.query.page ? router.query.page : 1) + 1}`);
  };

  const handlePrevPageClick = () => {
    router.push(`/pokemons/${Number(router.query.page ? router.query.page : 1) - 1}`);
  };
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
      <div className="w-full h-full">
        <PokemonList items={pokemonsForPage.result} />
      </div>
      <div className=" mt-4 flex justify-center items-center">
        <button
          disabled={!pokemonsForPage.pagination.previousPage}
          onClick={handlePrevPageClick}
          className="pagination__btn"
        >
          {"<"}
        </button>
        <span className="ml-2"> Page </span>
        <span className="ml-2"> {pokemonsForPage.pagination.currentPage} </span>
        <span className="ml-2"> Of </span>
        <span className="ml-2"> {pokemonsForPage.pagination.totalPages} </span>
        <button
          disabled={!pokemonsForPage.pagination.nextPage}
          onClick={handleNextPageClick}
          className="pagination__btn ml-2"
        >
          {">"}
        </button>
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
