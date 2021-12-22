import { useQuery } from 'react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

const PER_PAGE = 10

const fetchPokemons = page =>
    axios
        .get(
            `https://pokeapi.co/api/v2/pokemon?limit=${PER_PAGE}&offset=${
                page * PER_PAGE
            }`
        )
        .then(({ data }) => data)

const Pokemons = () => {
    const [page, setPage] = useState(0)

    return (
        <div>
            <Page page={page} />
            <div hidden>
                <Page page={page + 1} />
            </div>
            <div style={{ display: 'flex' }}>
                <button
                    onClick={() => setPage(current => Math.max(current - 1, 0))}
                >
                    previous
                </button>
                <button onClick={() => setPage(current => current + 1)}>
                    next
                </button>
            </div>
        </div>
    )
}

export default Pokemons

const Page = ({ page }) => {
    const { data, isLoading } = useQuery(['pokemons', page], () =>
        fetchPokemons(page)
    )

    if (isLoading || !data) {
        return 'Loading...'
    }

    return (
        <ul>
            {data.results.map(pokemon => (
                <li key={pokemon.name}>
                    <Link href={`/pokemons/${pokemon.name}`}>
                        {pokemon.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
