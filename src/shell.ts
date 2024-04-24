import { LiteElement, html, customElement } from '@vandeurenglenn/lite'
import { StyleList } from '@vandeurenglenn/lite/element'
import style from './shell.css.js'

@customElement('chat-shell')
export default class ChatShell extends LiteElement {
  static styles?: StyleList = [style]

  render() {
    return html` <chat-drawer></chat-drawer> `
  }
}
