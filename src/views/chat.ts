import style from './chat.css.js'
import { VanillaElement, html } from '../vanilla-element.js'
import { LiteElement, property, query } from '@vandeurenglenn/lite'
import './../elements/input.js'
import './../elements/messages.js'
export class ChatView extends LiteElement {
  static styles = [style]

  @property() accessor contact

  @property() accessor messages

  @query('chat-input') accessor chatInput

  set input(value) {
    this.chatInput.input = value
  }

  get input() {
    return this.chatInput.input
  }
  render() {
    return html`
      <h1>chatting with ${this.contact}</h1>
      <chat-messages .messages=${this.messages}></chat-messages>
      <chat-input></chat-input>
    `
  }
}

customElements.define('chat-view', ChatView)
