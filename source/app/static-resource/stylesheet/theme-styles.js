(function () {
  'use strict';

  angular
    .module('otusjs.application.theme')
    .constant('THEME_STYLES_REGISTER', {

      REGISTERED_STYLES: [
        "md-toolbar { color: {{accent-hue-1}}; }",
        "otus-participant-dashboard-toolbar>div>md-toolbar>div>otus-participant-search>md-autocomplete.md-default-theme input, md-autocomplete input { color: {{accent-hue-1}}; }",
        "otus-participant-dashboard-toolbar>div>md-toolbar>div>otus-participant-search>md-autocomplete>md-autocomplete-wrap>input::-webkit-input-placeholder { color: {{accent-hue-1}}; }",

        ".selectedState { border-color : {{primary-default}}; }",

        ".primary-header { color: {{accent-hue-1}}; background: {{primary-default}}; }",
        ".primary-fill { background: {{primary-default}}; }"
      ]

    });
}());