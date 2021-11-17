const apiServiceFactory = ({store}) => {
    const {pokemonService} = store;
    return {
        pokemonService,
    }
}

export default apiServiceFactory;