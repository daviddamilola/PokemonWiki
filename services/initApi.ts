import apiServiceFactory from "./api";
import pokemonServiceFactory from "./pokemonService";

const api = apiServiceFactory({
  store: {
    pokemonService: pokemonServiceFactory(),
  },
});

export default api;
