import config from "./config";
import { PokemonDetail, PokemonResult} from '../interfaces/'
const NodeCache = require("node-cache");
const cache = require("memory-cache");


const axios = config.axios;
const LIMIT = 16;

const pokemonCache = new NodeCache({ stdTTL: 60 * 60 });

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
      (eachPokemonResponse) => ({
          name: eachPokemonResponse.data.name,
          id: eachPokemonResponse.data.id,
          imageUrl: eachPokemonResponse.data.sprites.other['official-artwork'].front_default || eachPokemonResponse.data.sprites.front_default,
          species: eachPokemonResponse.data.species.name,
          types: eachPokemonResponse.data.types.map((type: any) => type.type.name),
          stats: eachPokemonResponse.data.stats.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
          weight: eachPokemonResponse.data.weight,
          height: eachPokemonResponse.data.height,
          moves: eachPokemonResponse.data.moves.map((move: any) => move.move.name),
      
      })
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

    const result = pokemonPromisesResolved

    const totalPages = Math.ceil(pokemonNamesAndUrlResult.count / LIMIT);

    const pagination = {
      currentPage: page,
      nextPage: page >= totalPages ? null : page + 1,
      previousPage: page > 1 ? page - 1 : null,
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
    return {
        name: response.data.name,
        id: response.data.id,
        imageUrl: response.data.sprites.other['official-artwork'].front_default || response.data.sprites.front_default,
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
        return (pokemon.name.toLowerCase().includes(searchTermLower) || pokemon.name.toLowerCase() === searchTermLower);
      })
      .map((pokemon) => pokemon.url);

      

    let targetPokemonsResolved = await getPokemonsDetailsByUrls(
      targetPokemonsUrls
    );

    

    targetPokemonsResolved = targetPokemonsResolved.length > LIMIT ? targetPokemonsResolved.slice(0,LIMIT): targetPokemonsResolved;
    
    return targetPokemonsResolved;
  };

  const searchForPokemon = async (searchTerm: string) => {
    
    let allPokemon: PokemonResult[] = pokemonCache.get("allPokemon");
    if (!allPokemon) {
      const { count }: { count: number } = (
        await getPokemonByUrl(`${config.baseURL}pokemon`)
      ).data;
      const { results }: { results: [PokemonResult] } = await (
        await getPokemonByUrl(`${config.baseURL}pokemon?limit=${count}`)
      ).data;
      
      pokemonCache.set("allPokemon", results);

      allPokemon = pokemonCache.get("allPokemon");
    }
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
