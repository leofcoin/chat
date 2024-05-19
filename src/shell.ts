import style from './shell.css.js'
import { VanillaElement, html } from './vanilla-element.js'
import './elements/content.js'
import './elements/drawer.js'

import '@vandeurenglenn/lite-elements/drawer-layout.js'
import '@vandeurenglenn/lite-elements/theme.js'
import '@vandeurenglenn/lite-elements/selector.js'
import '@vandeurenglenn/lite-elements/drawer-item.js'
import icons from './icons.js'

export class ChatShell extends VanillaElement {
  static styles = [style]

  get #content() {
    return this.shadowRoot.querySelector('chat-content')
  }

  connectedCallback() {
    onhashchange = this.onhashchange
    this.onhashchange()
  }

  onhashchange = async () => {
    if (location.hash) {
      const parts = location.hash.split('#!/')
      let name
      const params = {}
      if (parts[1].includes('?')) {
        const _parts = parts[1].split('?')
        name = _parts[0]
        console.log(_parts[1])

        if (_parts[1].includes('&')) {
          for (const param of _parts[1].split('&')) {
            const [key, value] = param.split('=')
            params[key] = value
          }
        } else {
          const [key, value] = _parts[1].split('=')
          params[key] = value
        }
      } else {
        name = parts[1]
      }

      const tagName = `${name}-view`
      if (!customElements.get(tagName)) await import(`./${name}.js`)

      this.#content.show(`<${tagName} ></${tagName}>`)

      if (params) {
        const el = this.#content.querySelector(tagName)
        for (const [key, value] of Object.entries(params)) {
          el[key] = value
        }
      }
    } else {
      location.hash = 'home'
    }
  }

  render() {
    return html`
      <custom-theme load-symbols="false" load-font="false"></custom-theme>
      ${icons}
      <custom-drawer-layout>
        <span slot="drawer-content">
          <custom-selector
            attr-for-selected="route"
            @selected=${({ detail }) => (location.hash = `#!/chat?contact=${detail}`)}>
            <custom-drawer-item route="eb"> eb</custom-drawer-item>
            <custom-drawer-item route="bhero"> bhero</custom-drawer-item>
          </custom-selector>

          <custom-selector attr-for-selected="route" @selected=${({ detail }) => (location.hash = `#!/${detail}`)}>
            <custom-drawer-item route="settings"> settings</custom-drawer-item>
          </custom-selector>
        </span>

        <chat-content></chat-content>
      </custom-drawer-layout>
    `
  }
}

customElements.define('chat-shell', ChatShell)
