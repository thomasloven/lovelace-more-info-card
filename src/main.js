import { LitElement, html } from "card-tools/src/lit-element";

class MoreInfoCard extends LitElement {

  static get properties() {
    return {
      hass: {},
    };
  }

  setConfig(config) {
    this.config = config;
  }
  getCardSize() {
    return 5;
  }

  firstUpdated() {
    const mic = this.shadowRoot.querySelector("ha-card").querySelector("more-info-controls").shadowRoot;
    mic.removeChild(mic.querySelector("app-toolbar"));
  }

  render() {
    const stateObj = this.hass && this.hass.states && this.hass.states[this.config.entity];
    const name = stateObj.attributes.friendly_name === undefined
      ? stateObj.entity_id.split(".")[1].replace(/_/g, " ")
      : stateObj.attributes.friendly_name;

    return html`
    <ha-card
      .header=${this.config.title || name}
    >
    <more-info-controls
      .dialogElement=${null}
      .canConfigure=${false}
      .hass=${this.hass}
      .stateObj=${stateObj}
    ></more-info-controls>
    </ha-card>
    `;
  }
}

customElements.define("more-info-card", MoreInfoCard);