import style from './chat.css.js'
import { VanillaElement, html } from '../vanilla-element.js'

export class ChatView extends VanillaElement {
  static styles = [style]

  static properties = {
    selected: {
      type: 'string'
    }
  }

  render() {
    return html`
      <h1>chatting with ${this.selected}</h1>
      <chat-input></chat-input>
    `
  }
}

customElements.define('chat-view', ChatView)
