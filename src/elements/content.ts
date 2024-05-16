import { VanillaElement, css, html } from '../vanilla-element.js'

export class ChatContent extends VanillaElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 240px;
        bottom: 0;
        right: 0;
        top: 0;
      }
    `
  ]

  show(tag) {
    this.innerHTML = tag
  }
  render() {
    return html` <slot></slot>`
  }
}
customElements.define('chat-content', ChatContent)
