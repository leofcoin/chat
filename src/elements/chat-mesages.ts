import { TemplateResult, html } from 'lit'

export class ChatMessage extends LiteElement {
  @property({ type: Object }) accessor message

  @property({ type: Object, consumes: 'wallet' }) accessor wallet
  @property({ type: String }) accessor selectedAccount

  onChange(propertyKey, value) {
    if (propertyKey === 'wallet') {
      this.selectedAccount = this.wallet.accounts[this.wallet.selectedAccountIndex][1]
    }
  }

  render(): TemplateResult<1> {
    return html`
      ${this.message && this.selectedAccount
        ? html`
            <flex-row
              >${this.message.sender.address === this.selectedAccount ? html`<flex-it></flex-it>` : ''}${this.message
                .sender.nickname || this.message.sender.address}${this.message.sender.address !== this.selectedAccount
                ? html`<flex-it></flex-it>`
                : ''}</flex-row
            >
            <span>${this.message.text}</span>
          `
        : ''}
    `
  }
}
