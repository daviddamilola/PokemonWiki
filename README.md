# Description

Pokeman Wiki is an application to browse and search for pokeman characters

### Features

- List of all pokemons, paginated by 16 items per page
- Text Search of pokemons by their names
- Detail of each pokeman characters 

### Screenshots

### Technologies used
- React, Nextjs , Typescript, Tailwind css

### How to install
- `git clone` the repository via `https://github.com/daviddamilola/PokemonWiki.git`
- run `yarn install` to get the neccessary dependencies
- run `yarn dev` to start the application

### Approach Taken:
-  https://pokeapi.co was used as the pokemon service.
-  The service was instantiated by `initApi` function in the services folder
-  the custom styles are defined in the styles folder and makes use of tailwinds utility classes.
-  all pokemons are cached when searching, and the search input field is debounced to improve the user experience on the app
-  the paginated routes are also cached to improve load times
-  context api is used to store search data and search states.
-  A mobile first approach was used to make the app responsive
-  other services can be added to the app by adding their respective factories to the apiServiceFactory.
```
const api = apiServiceFactory({
  store: {
    pokemonService: pokemonServiceFactory(),
    anotherService: anotherServiceFactory(),
  },
});
```

### Areas to improve upon:
-  The search is done by using the pokemons name as the search term, other fields can be used as a search term in the future.
-  The styling of the application can be improved upon.
-  The images can be loaded in lazily to improve the performance of the app.


### License
MIT


