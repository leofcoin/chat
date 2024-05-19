import { VanillaElement, css, html } from '../vanilla-element.js'
import './contacts/search.js'
import './contacts/recent.js'
import '@vandeurenglenn/lite-elements/icon-button.js'

export class ChatDrawer extends VanillaElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 240px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
      }
      .flex-one {
        display: flex;
        flex: 1;
      }

      header {
        width: 100%;
        display: flex;
      }
    `
  ]
  render() {
    return html`
      <header>
        <span class="flex-one"></span>
        <custom-icon-button icon="menu_open"></custom-icon-button>
      </header>
      <search-contacts></search-contacts>
      <recent-contacts></recent-contacts>
      <span class="flex-one"></span>
      <a href="#!/settings" data-route="settings">settings</a>
    `
  }
}
customElements.define('chat-drawer', ChatDrawer)
