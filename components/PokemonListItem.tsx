import React from 'react'
import Link from 'next/link'

import { IPokemonDetail } from '../interfaces'

type Props = {
  data: IPokemonDetail
}

const PokemonListItem = ({ data }: Props) => {
  
return(
  <Link href={`/pokemon-detail/${data.name}`}>
    <a className="pokemon-list-item">
      <img src={data.imageUrl} width="50%" height="75px" />
      <div className="px-4">
        <h3 className="text-xl text-center">Name: {data.name}</h3>
      </div>
    </a>
  </Link>
)
}

export default PokemonListItem
