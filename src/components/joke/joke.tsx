import { Component, Host, h, State, Prop } from '@stencil/core';

import 'mf-components';

import { JokeModel, JokeResponse } from '../../models/joke-response.interface';
import { hashToUrlParams } from '../../utils/utils';

@Component({
  tag: 'mf-joke',
  styleUrl: 'joke.css',
  shadow: true,
})
export class Joke {
  @Prop() firstName: string = 'Chuck';
  @Prop() lastName: string = 'Norris';
  @Prop() categories: Array<string> = [];

  @State() private joke: JokeModel;

  public get url(): string {
    const params = {
      escape: 'javascript',
      firstName: this.firstName,
      lastName: this.lastName,
      limitTo: this.categories.length ? JSON.stringify(this.categories) : undefined,
    };

    return `https://api.icndb.com/jokes/random${hashToUrlParams(params)}`;
  }

  public render() {
    return (
      <Host>
        <mf-button onOutClick={() => this.doFetchJoke()}>Load random Joke</mf-button>
        {this.renderJoke()}
      </Host>
    );
  }

  private async doFetchJoke(): Promise<void> {
    this.joke = await this.fetchJoke();
  }

  private async fetchJoke(): Promise<JokeModel> {
    const response: Response = await fetch(this.url);
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
