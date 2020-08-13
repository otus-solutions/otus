(function () {
  'use strict';

  angular
    .module('otusjs.application.theme')
    .constant('THEME_STYLES_REGISTER', {

      REGISTERED_STYLES: [
        ".primary-header { color: {{accent-hue-1}}; background: {{primary-default}}; }",
        ".primary-fill { background: {{primary-default}}; }",

        // styles.css
        "md-toolbar { color: {{accent-hue-1}}; }",
        ".selectedState { border-color : {{primary-default}}; }",

        ".dtp>.dtp-content>.dtp-date-view>header.dtp-header { background: {{primary-default}} !important; } ",
        ".dtp div.dtp-date, .dtp div.dtp-time { background: {{primary-default}} !important; } ",
        ".dtp table.dtp-picker-days tr>td>a.selected { background: {{primary-default}} !important; } ",
        ".dtp table.dtp-picker-days tr>td>a.hilite:not(.selected)  { color: {{primary-default}} !important; } ",
        ".dtp .dtp-picker-time>a.dtp-select-hour.selected { background: {{primary-default}} !important; } ",
        ".dtp .dtp-hand.on { background: {{primary-default}} !important; } ",
        ".dtp .dtp-actual-meridien a.selected { background: {{primary-default}} !important; } ",

        // component-style.css
        "otus-report-dashboard otus-panel .report-list .report-item { " +
        "  min-width: 250px; " +
        "  background: {{accent-hue-1}}; " +
        "}",

        "unattached-laboratory md-grid-tile-header {" +
        "  background: {{primary-default-0.68}} !important;" +
        "}",

        "offline-activity-collection md-grid-tile-header {" +
        "  background: {{primary-default-0.68}} !important;" +
        "}",

        // initial-config.css
        "#installer #separatorLine {" +
        "  font-size: 11px;" +
        "  background-color: {{primary-default}};" +
        "  color: {{accent-hue-1}};" +
        "}"
      ]

    });
}());