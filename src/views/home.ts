import style from './home.css.js'
import { VanillaElement, html } from '../vanilla-element.js'

export class HomeView extends VanillaElement {
  static styles = [style]

  render() {
    return html`<h1>home</h1>`
  }
}

customElements.define('home-view', HomeView)
