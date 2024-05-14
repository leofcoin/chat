import { LitElement, PropertyValueMap, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
//import '../elements/shorten-string.js'
// import { map } from 'lit/directives/map.js'
import '@vandeurenglenn/lite-elements/icon-button.js'
@customElement('chat-view')
export class ChatView extends LitElement {
  @property({ type: Array })
  accessor peers: [string, {}][] = []

  @property({ type: String })
  accessor peerId: string

  @property({ type: Boolean, reflect: true, attribute: 'is-desktop' })
  accessor isDesktop: boolean = false

  @property({ type: Boolean })
  accessor showAdditions: boolean = false

  @property({ type: Array }) accessor messages = []

  #peerChange = async (peer) => {
    this.peers = await client.peers()
  }

  async connectedCallback() {
    super.connectedCallback()
    this.shadowRoot.addEventListener('click', (event) => {
      const paths = event.composedPath()

      console.log(paths[0])

      if (paths[0].localName === 'custom-icon') {
        if (paths[0].getAttribute('icon') === 'mood') {
          this.showAdditions = !this.showAdditions
          //if (!customElements.get('emoji-selector')) {
          //  import('./../elements/emoji-selector.js')
          //}
          if (this.showAdditions) this.shadowRoot.querySelector('.additions').setAttribute('open', '')
          else this.shadowRoot.querySelector('.additions').removeAttribute('open')
        }
      } else if (paths[0].localName === 'emo-ji') {
        this.textarea.value += paths[0].emoji
      }
    })

    // this.shadowRoot.querySelector('.peerId').value = await client.peerId()
    this.peers = await client.peers()
    this.peerId = await client.peerId()
    pubsub.subscribe('peer:connected', this.#peerChange)
    pubsub.subscribe('peer:left', this.#peerChange)
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: row;
          width: 100%;
          height: 100%;
          border-top: 1px solid #383941;
        }
        .chat-container {
          height: 100%;
        }
        textarea {
          font-family: 'NotoColorEmoji';
          padding: 6px 12px;
          width: 100%;
          border: none;
          resize: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          margin-right: 24px;
          color: var(--md-sys-color-on-surface-container-highest);
          height: 24px;
        }

        .input-wrapper {
          padding: 12px 24px;
          box-sizing: border-box;
          width: 100%;
        }

        .input-container {
          box-sizing: border-box;
          border-radius: var(--md-sys-shape-corner-extra-large);
          padding: 6px 12px;
          box-sizing: border-box;
          min-height: 48px;
          background: #48464940;
        }

        .additions {
          bottom: 76px;
          position: absolute;
          transform: translate(120%, 110%);
          opacity: 0;
          pointer-events: 0;
        }
        .additions[open] {
          transform: translateY(0);
          pointer-events: auto;
          opacity: 1;
          transition: opacity ease-in 120ms, opacity ease-in 240ms;
        }

        custom-button[type='tertiary'] custom-icon {
          --custom-icon-color: var(--md-sys-color-on-tertiary);
        }

        .friends-list {
          max-width: 240px;
          box-sizing: border-box;
          padding: 12px 24px;
          border-right: 1px solid #383941;
        }

        flex-row {
          width: -webkit-fill-available;
          box-sizing: border-box;
          padding: 0 24px;
        }
      `
    ]
  }

  onAdditionClick = () => {
    console.log('cli')
  }

  @query('textarea')
  accessor textarea

  send() {
    this.messages.push({
      sender: 'Iondependent',
      text: this.textarea.value
    })
    this.textarea.value = ''
    this.requestUpdate()
  }

  render() {
    // return html`
    //   <flex-column class="chat-container">
    //     <array-repeat>
    //       <template>
    //         <chat-message></chat-message>
    //       </template>
    //     </array-repeat>
    //   </flex-column>

    //   <flex-column>
    //     <custom-pages>
    //       <emoji-selector data-route="emoji"></emoji-selector>
    //     </custom-pages>

    //     <flex-row>
    //       <custom-tabs>
    //         <custom-tab data-route="emoji" title="emoji"><custom-icon icon="mood"></custom-icon></custom-tab>
    //         <custom-tab data-route="gif" title="gif"><custom-icon icon="gif"></custom-icon></custom-tab>
    //       </custom-tabs>
    //     </flex-row>
    //     <textarea placeholder="type here"></textarea>
    //   </flex-column>
    // `
    return html`
      <flex-column class="friends-list">
        <flex-it></flex-it>
        <custom-button type="tertiary" label="add friend"
          ><custom-icon slot="icon" icon="add"></custom-icon
        ></custom-button>
      </flex-column>
      <flex-column>
        <flex-column class="chat-container">
          <!-- ${this.messages.map((message) => html`<chat-message .message=${message}></chat-message>`)} -->

          ${this.messages.map((message) => html`${message.text}`)}
        </flex-column>

        <flex-row class="additions">
          <flex-it></flex-it>
          <emoji-selector data-route="emoji"></emoji-selector>
        </flex-row>

        <div class="input-wrapper">
          <flex-row width="100%" center class="input-container">
            <textarea class="textarea" placeholder="type here" mode-edit="true"></textarea>

            <custom-icon icon="mood" @click=${() => this.onAdditionClick()} style="margin-right: 12px;"></custom-icon>
            <custom-icon icon="send" @click=${() => this.send()}> </custom-icon>
          </flex-row>
        </div>
      </flex-column>
    `
  }
}