import style from './chat.css.js'
import { VanillaElement, html } from '../vanilla-element.js'
import { LiteElement, property } from '@vandeurenglenn/lite'

export class ChatView extends LiteElement {
  static styles = [style]

  @property() accessor contact

  render() {
    return html`
      <h1>chatting with ${this.contact}</h1>
      <chat-input></chat-input>
    `
  }
}

customElements.define('chat-view', ChatView)
