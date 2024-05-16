import { VanillaElement, css, html } from '../../vanilla-element.js'

export class RecentContacts extends VanillaElement {
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
    return html` <span @click=${() => (location.hash = '#!/chat?selected=eb')}>eb</span> `
  }
}
customElements.define('recent-contacts', RecentContacts)
