import { LiteElement, html, customElement } from '@vandeurenglenn/lite'
import { StyleList } from '@vandeurenglenn/lite/element'
import style from './chat.css.js'

@customElement('chat-view')
export default class ChatView extends LiteElement {
  static styles?: StyleList = [style]

  render() {
    return html``
  }
}
