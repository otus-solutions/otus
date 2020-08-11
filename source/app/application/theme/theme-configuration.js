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

    const newLightBlueMap = $mdThemingProvider.extendPalette('light-blue', {
      '500': '#ffffff',
      'contrastDarkColors': ['500','A100','A400']
    });
    $mdThemingProvider.definePalette('new-light-blue', newLightBlueMap);

    /* Configuration icons - 24 is the size default of icons */
    $mdIconProvider.defaultIconSet('static-resource/image/icons/mdi.svg', 24);

    _setTheme(THEME_CONSTANTS.theme);

    fetch("app/static-resource/visual-identity/data.json")
      .then(response => {
        if(response.ok){
          response.json()
            .then(data => {
              _setTheme(data.theme)
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => {
        console.log(error);
      });


    function _setTheme(theme){
      console.log(JSON.stringify(theme, null, 2))//.

      $mdThemingProvider.theme('default')
        .primaryPalette(theme.primary.main, theme.primary.pallete)
        .accentPalette(theme.accent.main, theme.accent.pallete)
        .warnPalette(theme.warn.main, theme.warn.pallete)
        .backgroundPalette(theme.background);
    }

  }
}());
