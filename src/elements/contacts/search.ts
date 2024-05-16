import { VanillaElement, css, html } from '../../vanilla-element.js'

export class SearchContacts extends VanillaElement {
  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 56px;
      }
    `
  ]
  render() {
    return html` <input type="search" autocomplete="on" /> `
  }
}
customElements.define('search-contacts', SearchContacts)
