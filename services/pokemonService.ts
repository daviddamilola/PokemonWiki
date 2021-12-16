import config from "./config";
import { IPokemonDetail, IPokemonResult } from "../interfaces/";
const NodeCache = require("node-cache");
const cache = new NodeCache();

const axios = config.axios;
const LIMIT = 16;

const pokemonServiceFactory = () => {
  const getPokemonByUrl = async (url: string) => {
    try {
      const cachedResponse = cache.get(url);
      
      if (cachedResponse) {
        return cachedResponse;
      } else {
        const response =  await axios.get(url);
        cache.set(url, response.data);
        return response.data
      }
    } catch (error) {
      throw error;
    }
  };

  const getPokemonsDetailsByUrls = async (arrayOfUrls: [string]) => {
    const pokemonDetailsResolved = await Promise.all(
      arrayOfUrls.map((url) => getPokemonByUrl(url))
    );
    return pokemonDetailsResolved.map((eachPokemonResponse) => ({
      name: eachPokemonResponse.name,
      id: eachPokemonResponse.id,
      imageUrl:
        eachPokemonResponse.sprites.other["official-artwork"]
          .front_default || eachPokemonResponse.sprites.front_default,
      species: eachPokemonResponse.species.name,
      types: eachPokemonResponse.types.map((type: any) => type.type.name),
      stats: eachPokemonResponse.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      weight: eachPokemonResponse.weight,
      height: eachPokemonResponse.height,
      moves: eachPokemonResponse.moves.map((move: any) => move.move.name),
    }));
  };

  const getPagePokemons = async (page: number = 1) => {
    const pokemonNamesAndUrlResult = (
      await getPokemonByUrl(
        `${config.baseURL}/pokemon?offset=${page - 1}&limit=${LIMIT}`
      )
    );

    const pokemonNamesAndUrl = pokemonNamesAndUrlResult.results;

    const pokemonUrls = pokemonNamesAndUrl.map(
      (result: { name: string; url: string }) => {
        return result.url;
      }
    );

    const pokemonPromisesResolved = await getPokemonsDetailsByUrls(pokemonUrls);

    const result = pokemonPromisesResolved;

    const totalPages = Math.ceil(pokemonNamesAndUrlResult.count / LIMIT);

    const pagination = {
      currentPage: page,
      nextPage: page >= totalPages ? null : page + 1,
      previousPage: page > 1 ? page - 1 : null,
      totalPages,
    };

    return { result, pagination };
  };

  const getPagePokemonPagination = async () => {
    const pokemonNamesAndUrlResult = (
      await getPokemonByUrl(`${config.baseURL}/pokemon?limit=${LIMIT}`)
    );

    const count = pokemonNamesAndUrlResult.count;
    const pageCount = Math.ceil(count / LIMIT);

    const paginationPaths = new Array(pageCount).fill(0).map((_, index) => {
      return {
        pageNumber: `${index + 1}`,
      };
    });

    return paginationPaths;
  };

  const getPokemonByName = async (name?: number) => {
    const response = await axios.get(`/pokemon/${name}`);
    return {
      name: response.data.name,
      id: response.data.id,
      imageUrl:
        response.data.sprites.other["official-artwork"].front_default ||
        response.data.sprites.front_default,
      species: response.data.species.name,
      types: response.data.types.map((type: any) => type.type.name),
      stats: response.data.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
      weight: response.data.weight,
      height: response.data.height,
      moves: response.data.moves.map((move: any) => move.move.name),
    };
  };

  const handleSearch = async (allPokemon, searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();

    const targetPokemonsUrls = allPokemon
      .filter((pokemon) => {
        return (
          pokemon.name.toLowerCase().includes(searchTermLower) ||
          pokemon.name.toLowerCase() === searchTermLower
        );
      })
      .map((pokemon) => pokemon.url);

    let targetPokemonsResolved = await getPokemonsDetailsByUrls(
      targetPokemonsUrls
    );

    targetPokemonsResolved =
      targetPokemonsResolved.length > LIMIT
        ? targetPokemonsResolved.slice(0, LIMIT)
        : targetPokemonsResolved;

    return targetPokemonsResolved;
  };

  const searchForPokemon = async (searchTerm: string) => {
    const { count }: { count: number } = (
      await getPokemonByUrl(`${config.baseURL}pokemon`)
    );
    const { results: allPokemon }: { results: [IPokemonResult] } = await (
      await getPokemonByUrl(`${config.baseURL}pokemon?limit=${count}`)
    );

    return await handleSearch(allPokemon, searchTerm);
  };

  return {
    getPokemonByUrl,
    getPagePokemons,
    getPagePokemonPagination,
    getPokemonByName,
    searchForPokemon,
  };
};

export default pokemonServiceFactory;
