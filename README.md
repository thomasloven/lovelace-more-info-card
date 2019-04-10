more-info-card
==============

Display the more-info dialog of any entity as a lovelace card.

![more-info-card2](https://user-images.githubusercontent.com/1299821/55866774-56ff6e00-5b81-11e9-857d-e3a6edc17020.jpg)

# Installation instructions

This card requires [card-tools](https://github.com/thomasloven/lovelace-card-tools) to be installed.

For installation instructions [see this guide](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins).

The recommended type of this plugin is: `js`

### If you are using [custom\_updater](https://github.com/custom-components/custom_updater):
```yaml
resources:
- url: /customcards/github/thomasloven/card-tools.js
  type: js
- url: /customcards/github/thomasloven/more-info-card.js
  type: js
```

# Usage instructions

```yaml
type: custom:more-info-card
entity: <entity_id>
title: <title>
```

### `<entity_id>`
The entity to display

### `<title>`
Card title


## Example

```
type: custom:more-info-card
entity: vacuum.xiaomi_vacuum_cleaner
title: Vacuum cleaner
```

![more-info-card](https://user-images.githubusercontent.com/1299821/55860664-10a41200-5b75-11e9-9729-5b740e27c467.jpg)

---
<a href="https://www.buymeacoffee.com/uqD6KHCdJ" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
