import { VanillaElement, css, html } from '../vanilla-element.js'

export class ChatMessages extends VanillaElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      }
    `
  ]
  render() {
    return html``
  }
}
customElements.define('chat-messages', ChatMessages)
