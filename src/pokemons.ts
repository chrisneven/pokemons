/**
 * Generated by orval v6.5.1 🍺
 * Do not edit manually.
 * PokéAPI
 * The RESTful Pokémon API
 * OpenAPI spec version: 1.0.0
 */
import axios,{
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import {
  useQuery,
  UseQueryOptions,
  QueryFunction,
  UseQueryResult,
  QueryKey
} from 'react-query'
export interface Sprite {
  back_default?: string;
  back_female?: string;
  back_shiny?: string;
  back_shiny_female?: string;
  front_default?: string;
  front_female?: string;
  front_shiny?: string;
  front_shiny_female?: string;
}

export interface Pokemon {
  id?: number;
  height?: number;
  weight?: number;
  name?: string;
  sprites?: Sprite;
}

export type PageResultsItem = {
  name?: string;
  url?: string;
};

export interface Page {
  count?: number;
  next?: string;
  previous?: string;
  results?: PageResultsItem[];
}



type AsyncReturnType<
T extends (...args: any) => Promise<any>
> = T extends (...args: any) => Promise<infer R> ? R : any;


/**
 * Returns a single pokemon
 * @summary Find pokemon by ID
 */
export const getPokemon = (
     options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Page>> => {
    return axios.get(
      `/pokemon`,options
    );
  }


export const getGetPokemonQueryKey = () => [`/pokemon`];

    
export const useGetPokemon = <TData = AsyncReturnType<typeof getPokemon>, TError = AxiosError<void>>(
  options?: { query?:UseQueryOptions<AsyncReturnType<typeof getPokemon>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetPokemonQueryKey();

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getPokemon>> = () => getPokemon(axiosOptions);

  const query = useQuery<AsyncReturnType<typeof getPokemon>, TError, TData>(queryKey, queryFn, queryOptions)

  return {
    queryKey,
    ...query
  }
}


/**
 * Returns a single pokemon
 * @summary Find pokemon by ID or name
 */
export const getPokemonByIdOrName = (
    idOrName: number, options?: AxiosRequestConfig
 ): Promise<AxiosResponse<Pokemon>> => {
    return axios.get(
      `/pokemon/${idOrName}`,options
    );
  }


export const getGetPokemonByIdOrNameQueryKey = (idOrName: number,) => [`/pokemon/${idOrName}`];

    
export const useGetPokemonByIdOrName = <TData = AsyncReturnType<typeof getPokemonByIdOrName>, TError = AxiosError<void>>(
 idOrName: number, options?: { query?:UseQueryOptions<AsyncReturnType<typeof getPokemonByIdOrName>, TError, TData>, axios?: AxiosRequestConfig}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, axios: axiosOptions} = options || {}

  const queryKey = queryOptions?.queryKey ?? getGetPokemonByIdOrNameQueryKey(idOrName);

  

  const queryFn: QueryFunction<AsyncReturnType<typeof getPokemonByIdOrName>> = () => getPokemonByIdOrName(idOrName, axiosOptions);

  const query = useQuery<AsyncReturnType<typeof getPokemonByIdOrName>, TError, TData>(queryKey, queryFn, {enabled: !!(idOrName), ...queryOptions})

  return {
    queryKey,
    ...query
  }
}

