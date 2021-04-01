export interface PokeApiListResult<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export class PokeApiService {
  private readonly pokeBaseUrl = 'https://pokeapi.co/api/v2/';

  loadPage(offset: number, size: number): Promise<PokeApiListResult<Pokemon>> {
    return fetch(`${this.pokeBaseUrl}pokemon?offset=${offset}&limit=${size}`).then(response => response.json());
  }
}
