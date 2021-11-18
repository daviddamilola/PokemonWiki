import * as React from 'react'

import { PokemonDetail } from '../interfaces'

type ListDetailProps = {
  item: PokemonDetail
}

const ListDetail = ({ item: pokemon }: ListDetailProps) => (
  <div className="pokemon-detail">
    <div className="w-full pokemon-detail__container">

    </div>
    <h1 className="text-center mb-8">Detail for {pokemon.name}</h1>
    <img src={pokemon.sprite.front_shiny} alt="pokemon image" />
    <p>ID: {pokemon.id}</p>
  </div>
)

export default ListDetail
