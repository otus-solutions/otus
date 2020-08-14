(function () {
  'use strict';

  angular
    .module('otusjs.application.theme')
    .constant('THEME_CONSTANTS', {
      "projectName": "ELSA",

      "imageURLs": {
        "icons": {
          "mdi": 'static-resource/visual-identity/images/icons/mdi.svg'
        },
        "banner": "static-resource/visual-identity/images/banner.png",
        "crash": "static-resource/visual-identity/images/otus-crash.png",
        "favicon": "static-resource/visual-identity/images/favicon.ico",
        "icon": "static-resource/visual-identity/images/logo-2352x811.png",
        "loading": "static-resource/visual-identity/images/apple-touch-icon.png"
      },

      "palette": {
        "new-light-grey" : {
          "baseName": "grey",
          "map": {
            "50": "#ffffff",
            "contrastDarkColors": ["500", "A100", "A400"]
          }
        }
      },

      "theme": {
        "primary": {
          "main": "blue",
          "pallete": {
            "default": "700",
            "hue-1": "500",
            "hue-2": "600",
            "hue-3": "800"
          }
        },
        "accent": {
          "main": "new-light-grey",
          "pallete": {
            "default": "700",
            "hue-1": "50",
            "hue-2": "600",
            "hue-3": "800"
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
      }

    });
}());