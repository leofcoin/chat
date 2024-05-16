import { VanillaElement, css, html } from '../vanilla-element.js'

export class ChatInput extends VanillaElement {
  static styles = css`
    :host() {
      display: flex;
      flex-direction: row;
    }
  `
  render() {
    return html`
      <textarea> </textarea>
      <button>send</button>
    `
  }
}
customElements.define('chat-drawer', ChatInput)
