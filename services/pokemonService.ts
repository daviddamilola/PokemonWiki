import config from "./config";
import { PokemonDetail} from '../interfaces/'
const NodeCache = require("node-cache");
const cache = require("memory-cache");


const axios = config.axios;
const LIMIT = 16;



const pokemonServiceFactory = () => {

  const getPokemonByUrl = async (url: string) => {
    const cachedResponse = cache.get(url);
    if (cachedResponse) {
      return cachedResponse;
    } else {
      const hours = 24;
      const data = axios.get(url);
      cache.put(url, data, hours * 1000 * 60 * 60);
      return data;
    }
  };

  const getPokemonsDetailsByUrls = async (arrayOfUrls: [string]) => {
    const pokemonDetailsResolved = await Promise.all(
      arrayOfUrls.map((url) => getPokemonByUrl(url))
    );
    return pokemonDetailsResolved.map(
      (eachPokemonResponse) => eachPokemonResponse.data
    );
  };

  const getPagePokemons = async (page: number = 1) => {
    const pokemonNamesAndUrlResult = (
      await getPokemonByUrl(
        `${config.baseURL}/pokemon?offset=${page - 1}&limit=${LIMIT}`
      )
    ).data;

    const pokemonNamesAndUrl = pokemonNamesAndUrlResult.results;

    const pokemonUrls = pokemonNamesAndUrl.map(
      (result: { name: string; url: string }) => {
        return result.url;
      }
    );

    const pokemonPromisesResolved = await getPokemonsDetailsByUrls(pokemonUrls);

    const result = pokemonPromisesResolved.map((listItem: PokemonDetail) => ({
      name: listItem.name,
      species: listItem.species,
      types: listItem.types,
      sprite: listItem.sprites,
    }));

    const totalPages = Math.ceil(pokemonNamesAndUrlResult.count / LIMIT);

    const pagination = {
      currentPage: page,
      nextPage: page >= totalPages ? null : page + 1,
      previousPage: page > 2 ? page - 1 : null,
      totalPages,
    }

    return { result, pagination };
  };

  const getPagePokemonPagination = async () => {
    const pokemonNamesAndUrlResult = (
      await getPokemonByUrl(
        `${config.baseURL}/pokemon?limit=${LIMIT}`
      )
    ).data;

    const count = pokemonNamesAndUrlResult.count;
    const pageCount = Math.ceil(count / LIMIT);

    const paginationPaths = new Array(pageCount).fill(0).map((_, index) => {
      return {
        pageNumber: `${index + 1}`,
      };
    });

    return paginationPaths
  };

  

  const getPokemonByName = async (name?: number) => {
    const response = await axios.get(`/pokemon/${name}`);
    return response.data;
  };

  return {
    getPokemonByUrl,
    getPagePokemons,
    getPagePokemonPagination,
    getPokemonByName,
  };
};

export default pokemonServiceFactory;
