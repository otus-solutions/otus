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

  function Configuration($mdThemingProvider, $mdIconProvider, THEME_CONSTANTS) {

    /* Configuration icons - 24 is the size default of icons */
    $mdIconProvider.defaultIconSet('static-resource/image/icons/mdi.svg', 24);

    _setTheme(THEME_CONSTANTS);

    fetch("app/static-resource/visual-identity/data.json")
      .then(response => {
        if(response.ok){
          response.json()
            .then(data => _setTheme(data))
            .catch(error => console.log(error));
        }
      })
      .catch(error => {
        console.log(error);
      });

    function _setTheme(paletteThemeObj) {
      console.log(JSON.stringify(paletteThemeObj, null, 2))//.

      for(let [paletteName, palette] of Object.entries(paletteThemeObj.palette)){
        const newMap = $mdThemingProvider.extendPalette(palette.baseName, palette.map);
        $mdThemingProvider.definePalette(paletteName, newMap);
      }

      const theme = paletteThemeObj.theme;
      $mdThemingProvider.theme('default')
        .primaryPalette(theme.primary.main, theme.primary.pallete)
        .accentPalette(theme.accent.main, theme.accent.pallete)
        .warnPalette(theme.warn.main, theme.warn.pallete)
        .backgroundPalette(theme.background);

      if(paletteThemeObj.styles){
        paletteThemeObj.styles.forEach(style => {
          $mdThemingProvider.registerStyles(style);
        })
      }
    }

  }
}());
