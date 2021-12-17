import React from "react";
import Link from "next/link";
import Image from "next/Image";
import { IPokemonDetail } from "../interfaces";

type Props = {
  data: IPokemonDetail;
};

const PokemonListItem = ({ data }: Props) => {
  return (
    <Link href={`/pokemon-detail/${data.name}`}>
      <a className="pokemon-list-item w-100 h-100">
        <Image
          width="150px"
          height="150px"
          src={data?.imageUrl}
          alt="pokemon image"
          placeholder="blur"
          blurDataURL={data.placeholder}
        />
        <div className="px-4">
          <h3 className="text-xl text-center">Name: {data.name}</h3>
        </div>
      </a>
    </Link>
  );
};

export default PokemonListItem;
