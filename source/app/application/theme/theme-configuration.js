(function() {
  'use strict';

  angular
    .module('otusjs.application.theme')
    .config(Configuration);

  Configuration.$inject = [
    '$mdThemingProvider',
    '$mdIconProvider',
    'THEME_CONSTANTS'
  ];

  const FAKE_JSON = {
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
        "main": "pink",
        "pallete": {
          "default": "700",
          "hue-1": "500",
          "hue-2": "600",
          "hue-3": "800"
        }
      },
      "accent": {
        "main": "blue",
        "pallete": {
          "default": "A100",
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
      "background" : "yellow"
    },

    "styles": [
      "md-toolbar { color: {{accent-hue-1}}; }",
      ".primary-header { color: {{accent-hue-1}}; background: {{primary-default}}; }",
      //".gradient-header { background: 'linear-gradient(to right, {{primary-hue-3}}, {{primary-hue-1}})'} "
    ],

    "bannerURL": "app/static-resource/visual-identity/banner.png",
    "toolbarIconURL": "app/static-resource/visual-identity/toolbar.png",
    "projectName":"OTUS"
  };

  function Configuration($mdThemingProvider, $mdIconProvider, THEME_CONSTANTS) {

      /* Configuration icons - 24 is the size default of icons */
      $mdIconProvider.defaultIconSet('static-resource/image/icons/mdi.svg', 24);

      console.log(JSON.stringify(THEME_CONSTANTS, null, 2))//.

      for(let [paletteName, palette] of Object.entries(THEME_CONSTANTS.palette)){
        const newMap = $mdThemingProvider.extendPalette(palette.baseName, palette.map);
        $mdThemingProvider.definePalette(paletteName, newMap);
      }

      const theme = THEME_CONSTANTS.theme;
      $mdThemingProvider.theme('default')
        .primaryPalette(theme.primary.main, theme.primary.pallete)
        .accentPalette(theme.accent.main, theme.accent.pallete)
        .warnPalette(theme.warn.main, theme.warn.pallete)
        .backgroundPalette(theme.background);

      $mdThemingProvider.alwaysWatchTheme(true);

      const styles = [
        "md-toolbar { color: {{accent-hue-1}}; }",
        ".primary-header { color: {{accent-hue-1}}; background: {{primary-default}}; }",
        ".primary-fill { background: {{primary-default}}; }",
      ];

      styles.forEach(style => {
        $mdThemingProvider.registerStyles(style);
      });
  }

}());
