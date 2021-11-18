import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { User } from '../interfaces'

type Props = {
  data: User
}

const PokemonListItem = ({ data }: Props) => {
  console.log(data);
  
return(
  <Link href={`/pokemon-detail/${data.name}`}>
    <a className="pokemon-list-item">
      <img src={data.sprite.front_shiny} width="100%" height="150px" />
      <div className="px-4">
        <h3 className="text-xl">Name: {data.name}</h3>
      </div>
    </a>
  </Link>
)
}

export default PokemonListItem
