import { Component, Host, h, State, Prop } from '@stencil/core';

import 'mf-components';
import { JokeModel, JokeResponse } from '../../models/joke-response.interface';

@Component({
  tag: 'mf-joke',
  styleUrl: 'joke.css',
  shadow: true,
})
export class Joke {
  @Prop() firstName: string = 'Chuck';
  @Prop() lastName: string = 'Norris';

  @State() private joke: JokeModel;

  render() {
    return (
      <Host>
        <mf-button onOutClick={() => this.onButtonClick()}>Load new random Joke</mf-button>
        {this.renderJoke()}
      </Host>
    );
  }

  private async onButtonClick(): Promise<void> {
    this.joke = await this.fetchJoke();
  }

  private async fetchJoke(): Promise<JokeModel> {
    const response: Response = await fetch(
      `https://api.icndb.com/jokes/random?escape=javascript&firstName=${this.firstName}&lastName=${this.lastName}`
    );
    const data: JokeResponse = await response.json();

    return data.value;
  }

  private renderJoke() {
    if (this.joke) {
      return <div class="joke">{this.joke.joke}</div>;
    } else {
      return <span>&nbsp;</span>;
    }
  }
}
