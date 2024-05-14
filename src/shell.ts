import { LiteElement, html, customElement } from '@vandeurenglenn/lite'
import { StyleList } from '@vandeurenglenn/lite/element'
import style from './shell.css.js'
import './views/chat.js'

@customElement('chat-shell')
export default class ChatShell extends LiteElement {
  static styles?: StyleList = [style]

  render() {
    return html` <chat-drawer>
       <a href="#!/chat" data-route="chat">
              <custom-icon icon="chat"></custom-icon>
            </a>
    </chat-drawer> `
  }
}
