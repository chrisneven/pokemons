/* eslint-disable @next/next/no-img-element */
import { QueryClient, useQuery, dehydrate } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

const fetchPokemon = ({ queryKey: [, name] }) => {
    return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(({ data }) => data)
}

const PokemonPage = props => {
    console.log(props)
    const {
        query: { name },
    } = useRouter()

    const { data, isLoading } = useQuery(['pokemon', name], fetchPokemon)

    if (isLoading || !data) {
        return 'Loading...'
    }

    const {
        name: pokeName,
        order,
        sprites: { front_default },
    } = data

    return (
        <div>
            <img src={front_default} alt='front' />

            <h1>{pokeName}</h1>

            <Link href='/pokemons'>All pokemon</Link>
        </div>
    )
}

export default PokemonPage

export const getStaticProps = async ({ params: { name } }) => {
    const client = new QueryClient()
    await client.prefetchQuery(['pokemon', name], fetchPokemon)

    return {
        props: {
            dehydratedState: dehydrate(client),
        },
    }
}

export const getStaticPaths = async () => {
    const res = await axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
        .then(({ data }) => data)
    const { results } = res

    return {
        paths: results.map(result => ({ params: { name: result.name } })),
        fallback: false,
    }
}
