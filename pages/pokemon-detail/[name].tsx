import { GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import ListDetail from '../../components/ListDetail'
import api from '../../services/initApi'
import {IPokemonDetail} from '../../interfaces'

type Props = {
  item?: IPokemonDetail
  errors?: string
}

const PokemonDetail = ({ item, errors }: Props) => {
  if (errors) {
    return (
      <Layout title="Error">
        <p>
          <span style={{ color: 'red' }}>Error:</span> {errors}
        </p>
      </Layout>
    )
  }

  return (
    <Layout
      title={`${
        item ? item.name : 'Pokemon Detail'
      }`}
    >
      {item && <ListDetail item={item} />}
    </Layout>
  )
}

export default PokemonDetail


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const name = params?.name
    const item:Promise<IPokemonDetail> = await api.pokemonService.getPokemonByName(name)
    return { props: { item } }
  } catch (err) {
    return { props: { errors: err.message } }
  }
}
