import { Component, ComponentDidLoad, ComponentInterface, h, Host, Prop, State } from '@stencil/core';
import { PokeApiService, Pokemon } from '../../services/poke-api.service';

@Component({
  tag: 'pokemon-list',
  styleUrl: 'pokemon-list.scss',
  shadow: true,
})
export class PokemonList implements ComponentInterface, ComponentDidLoad {
  private itemsPerPage = 10;
  private offset = 0;
  private pokeApiService = new PokeApiService();

  @State() private pokemons: Pokemon[];
  @State() private pokemonCount: number;

  /** The title of this Pokémon List. */
  @Prop() listTitle = 'Pokémon List';

  componentDidLoad(): void {
    this.loadPage();
  }

  private loadPage(): void {
    this.pokeApiService.loadPage(this.offset, this.itemsPerPage).then(response => {
      this.pokemons = response.results;
      this.pokemonCount = response.count;
    });
  }

  private handlePaging(paging: { offset: number }): void {
    this.offset = paging.offset;
    this.loadPage();
  }

  render() {
    return (
      <Host>
        <header>
          <h2>{this.listTitle}</h2>
        </header>

        {this.pokemons && this.pokemons.length ? (
          <div>
            <p>There are {this.pokemonCount} pokémons in the database.</p>
            <p>Here are the next {this.pokemons.length}.</p>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.pokemons.map(pokemon => (
                  <tr>
                    <td>{pokemon.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <list-pagination count={this.pokemonCount} offset={this.offset} itemsPerPage={this.itemsPerPage} onPaging={event => this.handlePaging(event.detail)} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Host>
    );
  }
}
