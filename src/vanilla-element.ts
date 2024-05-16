import { html, render } from 'lit-html'
import { CSSResult, css } from '@lit/reactive-element/css-tag.js'

export { html, CSSResult, css }

export type propertyOptions = {
  type?: string
  onchange?: (value) => any
  reflect?: boolean
  autoUpdate?: boolean
  value?: any
}

interface VanillaElementConstructor extends CustomElementConstructor {
  properties: { [name: string]: propertyOptions }
  styles: CSSResult[] | CSSStyleSheet[]
}

export class VanillaElement extends HTMLElement {
  get #staticProperties() {
    const c = customElements.get(this.localName) as VanillaElementConstructor
    return c.properties || {}
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.#setupStyles()
    this.#setupProperties()
    this.requestUpdate()
  }

  #setupStyles() {
    const klass = customElements.get(this.localName) as unknown as VanillaElementConstructor
    if (klass.styles) {
      console.log(Array.isArray(klass.styles))
      this.shadowRoot.adoptedStyleSheets = klass.styles.map((style) => style.styleSheet ?? style)
    }
  }

  #setupProperties() {
    const properties = {}
    for (const [name, config] of Object.entries(this.#staticProperties)) {
      properties[name] = {
        set: (value) => {
          if (config.type === 'boolean') this[`_${name}`] = value === 'true' || this.hasAttribute(name)
          else if (config.type === 'array' || config.type === 'object') this[`_${name}`] = JSON.parse(value)
          else if (config.type === 'number') this[`_${name}`] = Number(value)
          else if (config.type === 'uint8Array') this[`_${name}`] = new Uint8Array(Object.values(JSON.parse(value)))
          else this[`_${name}`] = value

          if (config.onchange) config.onchange(value)
          if (config.reflect) {
            if (config.type === 'boolean') {
              if (value) this.setAttribute(name, '')
              else this.removeAttribute(name)
            } else if (config.type === 'array' || config.type === 'object')
              this.setAttribute(name, JSON.stringify(value))
            else this.setAttribute(name, value.toString())
          }
          if (config.autoUpdate || config.autoUpdate === undefined) this.requestUpdate()
        },
        get: () => {
          return this[`_${name}`] || config.value
        }
      }
      if (this.hasAttribute(name)) {
        this[name] = this.getAttribute(name)
      }
    }
    Object.defineProperties(this, properties)
  }

  beforeUpdate?: () => any

  render() {
    return html` <slot></slot> `
  }

  async #performAsyncUpdate() {
    await this.beforeUpdate()
    this.#performUpdate()
  }

  #performUpdate() {
    render(this.render(), this.shadowRoot)
  }

  requestUpdate() {
    if (this.beforeUpdate) return this.#performAsyncUpdate()
    else this.#performUpdate()
  }
}
