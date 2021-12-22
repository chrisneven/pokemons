/* eslint-disable @next/next/no-img-element */
import { useQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

const fetchPokemon = name =>
    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(({ data }) => data)

const PokemonPage = props => {
    const {
        query: { name },
    } = useRouter()

    const { data, isLoading } = useQuery(
        ['pokemon', name],
        () => fetchPokemon(name),
        { enabled: !!name }
    )

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

            <Link href="/pokemons">All pokemon</Link>
        </div>
    )
}

export default PokemonPage
