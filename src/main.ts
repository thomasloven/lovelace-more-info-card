import { LitElement, html } from "lit";
import { property } from "lit/decorators.js";
import pjson from "../package.json";
import "./editor.ts";

const DOMAINS_NO_INFO = ["camera", "configurator"];
const DOMAINS_NO_MORE_INFO = [
  "input_number",
  "input_select",
  "input_text",
  "number",
  "scene",
  "select",
];

class MoreInfoCard extends LitElement {
  @property() hass;
  @property() config;

  static getConfigElement() {
    return document.createElement("more-info-card-editor");
  }
  static getStubConfig(hass, entities, entitiesFill) {
    const ents = entitiesFill.filter((e) => {
      const domain = e.split(".")[0];
      return !(
        DOMAINS_NO_MORE_INFO.includes(domain) ||
        DOMAINS_NO_INFO.includes(domain)
      );
    });
    return {
      entity: ents[Math.floor(Math.random() * ents.length)] || "",
    };
  }

  setConfig(config) {
    this.config = config;
    const domain = this.config.entity.split(".")[0];
    (window as any).loadCardHelpers().then((helpers: any) => {
      helpers.importMoreInfoControl(domain);
    });
  }

  getCardSize() {
    return 5;
  }

  render() {
    if (
      !this.hass ||
      !this.hass.states ||
      !this.hass.states[this.config.entity]
    )
      return html`
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

    const name =
      stateObj.attributes.friendly_name === undefined
        ? stateObj.entity_id.split(".")[1].replace(/_/g, " ")
        : stateObj.attributes.friendly_name;

    return html`
      <ha-card .header=${this.config.title || name}>
        <div class="card-content">
          ${DOMAINS_NO_MORE_INFO.includes(domain)
            ? html` No More Info Available `
            : html`
                ${DOMAINS_NO_INFO.includes(domain)
                  ? ""
                  : html`
                      <state-card-content
                        .stateObj=${stateObj}
                        .hass=${this.hass}
                      ></state-card-content>
                    `}
                <more-info-content
                  .hass=${this.hass}
                  .stateObj=${stateObj}
                ></more-info-content>
              `}
        </div>
      </ha-card>
    `;
  }
}

customElements.define("more-info-card", MoreInfoCard);
console.info(
  `%cMORE-INFO-CARD ${pjson.version} IS INSTALLED`,
  "color: green; font-weight: bold",
  ""
);
