import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

class MoreInfoCardEditor extends LitElement {
  @property() hass;
  @property() lovelace;
  @state() _config;

  setConfig(config) {
    this._config = config;
  }

  _valueChanged(ev) {
    if (!this._config) return;
    this._config = { ...this._config, entity: ev.target.value };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: this._config } })
    );
  }

  render() {
    return html`
      <ha-entity-picker
        .label="${this.hass.localize(
          "ui.panel.lovelace.editor.card.generic.entity"
        )} (${this.hass.localize(
          "ui.panel.lovelace.editor.card.config.required"
        )})"
        .hass=${this.hass}
        .value=${this._config.entity}
        .configValue=${"entity"}
        @change=${this._valueChanged}
        allow-custom-entity
      ></ha-entity-picker>
    `;
  }
}

customElements.define("more-info-card-editor", MoreInfoCardEditor);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "more-info-card",
  name: "More-info card",
  preview: true,
  description: "Display the more-info dialog of an entity as a card",
});
