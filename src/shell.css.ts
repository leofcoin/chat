import { css } from './vanilla-element.js'
export default css`
  :host {
    display: flex;
    flex-direction: row;
    position: absolute;
    inset: 0;
  }

  span[slot='drawer-content'] {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`
