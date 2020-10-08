import { LitElement, html } from 'https://unpkg.com/lit-element?module';

class CountButton extends LitElement {
  static get properties() {
    return {
      value: { type: Number },
    };
  }

  constructor() {
    super();
    this.value = 0;
  }

  render() {
    return html`
      <button type="button" @click="${this.increment}">
        I have been pressed ${this.value} times
      </button>
    `;
  }

  increment() {
    this.value++;
  }
}

customElements.define('count-button', CountButton);
