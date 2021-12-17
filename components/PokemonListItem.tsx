import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IPokemonDetail } from '../interfaces'

type Props = {
  data: IPokemonDetail
}

const PokemonListItem = ({ data }: Props) => {
  
return(
  <Link href={`/pokemon-detail/${data.name}`}>
    <a className="pokemon-list-item w-100 h-100">
      <Image src={data.imageUrl} width="100%" height="100%" />
      <div className="px-4">
        <h3 className="text-xl text-center">Name: {data.name}</h3>
      </div>
    </a>
  </Link>
)
}

export default PokemonListItem
