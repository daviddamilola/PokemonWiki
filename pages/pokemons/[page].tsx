import { GetStaticProps, GetStaticPaths } from "next";
import React from "react";
import api from "../../services/initApi";
import Link from "next/link";
import PokemonList from "../../components/PokemonList";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { useSearch } from "../../context/searchContext";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination";
import { IPagination, IPokemonDetail } from "../../interfaces";

type Props = {
  pokemonsForPage: {
    result: IPokemonDetail[],
    pagination: IPagination,
  };
  errors: string;
};

const PokemonPage = ({ pokemonsForPage, errors }: Props) => {
  const router = useRouter();
  const {
    searchValue: { isSearching, searchResults, searchTerm },
    resetSearch,
  } = useSearch();

  const handleNextPageClick = () => {
    router.push(
      `/pokemons/${Number(router.query.page ? router.query.page : 1) + 1}`
    );
  };

  const handlePrevPageClick = () => {
    router.push(
      `/pokemons/${Number(router.query.page ? router.query.page : 1) - 1}`
    );
  };
  if (isSearching) {
    return (
      <Layout>
        <SearchBar />
        <div className="flex justify-between items-center">
        <p className="my-4">Search Results for: {searchTerm}</p>{" "}
        <button
          type="button"
          onClick={() => resetSearch()}
          className="px-2 py-2 bg-black text-white"
        >
          X Clear Search Results
        </button>
          </div>

        <PokemonList items={searchResults} />
      </Layout>
    );
  }

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
      <div className="w-full mb-4">
        <SearchBar />
      </div>
      <div className="w-full h-full">
        <PokemonList items={pokemonsForPage.result} />
      </div>
      <div className="my-4">
        <Pagination
          pagination={pokemonsForPage.pagination}
          handlePrevPageClick={handlePrevPageClick}
          handleNextPageClick={handleNextPageClick}
        />
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
