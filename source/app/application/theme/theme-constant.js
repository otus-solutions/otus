(function () {
  'use strict';

  angular
    .module('otusjs.application.theme')
    .constant('THEME_CONSTANTS', {

      "palette": {
        "new-light-blue" : {
          "baseName": "light-blue",
          "map": {
            "500": "#ffffff",
            "contrastDarkColors": ["500", "A100", "A400"]
          }
        }
      },

      "theme": {
        "primary": {
          "main": "teal",
          "pallete": {
            "default": "700",
            "hue-1": "500",
            "hue-2": "600",
            "hue-3": "800"
          }
        },
        "accent": {
          "main": "new-light-blue",
          "pallete": {
            "default": "A700",
            "hue-1": "500",
            "hue-2": "A100",
            "hue-3": "A400"
          }
        },
        "warn": {
          "main": "red",
          "pallete": {
            "default": "A200",
            "hue-2": "A100",
            "hue-3": "A400"
          }
        },
        "background" : "grey"
      },

      "styles": [
        "md-card-header { color: {{accent-hue-1}}; background: {{primary-default}}; }"
      ],

      "bannerURL": "app/static-resource/visual-identity/banner.png",
      "toolbarIconURL": "app/static-resource/visual-identity/toolbar.png",
      "projectName":"OTUS"

    });
}());