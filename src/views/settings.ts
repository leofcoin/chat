import style from './home.css.js'
import { VanillaElement, html } from '../vanilla-element.js'

export class SettingsView extends VanillaElement {
  static styles = [style]

  render() {
    return html`<h1>settings</h1>`
  }
}

customElements.define('settings-view', SettingsView)
