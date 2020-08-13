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
        "otus-participant-dashboard-toolbar>div>md-toolbar>div>otus-participant-search>md-autocomplete>md-autocomplete-wrap>input { color: {{accent-hue-1}} !important; }",
        "otus-participant-dashboard-toolbar>div>md-toolbar>div>otus-participant-search>md-autocomplete>md-autocomplete-wrap>button { color: {{accent-hue-1}}; !important }",
        "otus-participant-dashboard-toolbar>div>md-toolbar>div>otus-participant-search>md-autocomplete>md-autocomplete-wrap>input::-webkit-input-placeholder { color: {{accent-hue-1}}; !important }",
        "otus-participant-dashboard-toolbar>div>md-toolbar>div>otus-participant-search>md-autocomplete>md-autocomplete-wrap>button>md-icon>svg>g>path { fill: {{accent-hue-1}}; !important }",
        "otus-participant-dashboard-toolbar>div>md-toolbar>div>otus-participant-search>md-autocomplete { color: {{accent-hue-1}}; !important }",

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

        "unattached-laboratory md-grid-tile-header {\n" +
        "  background: {{primary-default-0.68}} !important;\n" +
        "}",

        "offline-activity-collection md-grid-tile-header {\n" +
        "  background: {{primary-default-0.68}} !important;\n" +
        "}",

        // initial-config.css
        "#installer #separatorLine {\n" +
        "  font-size: 11px;\n" +
        "  background-color: {{primary-default}};\n" +
        "  color: {{accent-hue-1}};\n" +
        "}"
      ]

    });
}());