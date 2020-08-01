import { LitElement, html, css } from "card-tools/src/lit-element";

const DOMAINS_NO_INFO = ["camera", "configurator"];
const DOMAINS_NO_MORE_INFO = ["input_number", "input_select", "input_text", "scene"];

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

  render() {
    if(!this.hass || !this.hass.states || !this.hass.states[this.config.entity])
      return html `
        <ha-card
          .header="$this.config.title || Unknown Entity"
          style="--ha-card-background: var(--primary-color); filter: grayscale(1);"
        >
          <div class="card-content" style="color: var(--text-primary-color);">
            Unknown entity.
          </div>
        </ha-card>
      `;

    const stateObj = this.hass.states[this.config.entity];

    const domain = this.config.entity.split(".")[0];

    const name = stateObj.attributes.friendly_name === undefined
      ? stateObj.entity_id.split(".")[1].replace(/_/g, " ")
      : stateObj.attributes.friendly_name;

    return html`
    <ha-card
      .header=${this.config.title || name}
    >
      <div class="card-content">
        ${DOMAINS_NO_MORE_INFO.includes(domain)
          ? html`
              No More Info Available
            `
          : html`
            ${DOMAINS_NO_INFO.includes(domain)
              ? ""
              : html`
                  <state-card-content
                    .stateObj=${stateObj}
                    .hass=${this.hass}
                  ></state-card-content>
              `
            }
            <more-info-content
              .hass=${this.hass}
              .stateObj=${stateObj}
            ></more-info-content>
          `
        }
      </div>
    </ha-card>
    `;
  }

}

customElements.define("more-info-card", MoreInfoCard);
if(!customElements.get("more-info-card")) {
  customElements.define('more-info-card', BadgeCard);
  const pjson = require('../package.json');
  console.info(`%cMORE-INFO-CARD ${pjson.version} IS INSTALLED`,
  "color: green; font-weight: bold",
  "");
}
