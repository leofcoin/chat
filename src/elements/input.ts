import { VanillaElement, css, html } from '../vanilla-element.js'

export class ChatInput extends VanillaElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;

        overflow: hidden;
        padding: 6px 6px 6px 12px;
        height: 48px;
        align-items: center;
        background: var(--md-sys-color-surface-container-high);
      }
      :host,
      .chat-content {
        outline: none;
        width: 100%;
        border-radius: var(--md-sys-shape-corner-large);
      }

      p {
        padding: 0;
        margin: 0;
      }
    `
  ]
  render() {
    return html`
      <p contenteditable="true" class="chat-content"></p>
      <custom-icon-button icon="send"></custom-icon-button>
    `
  }
}
customElements.define('chat-input', ChatInput)
