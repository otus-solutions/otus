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

    /*Configuration icons*/
    /* 24 is the size default of icons */
    $mdIconProvider.defaultIconSet('static-resource/image/icons/mdi.svg', 24);

    _setTheme('default', THEME_CONSTANTS.DEFAULT_THEME);

    fetch("app/static-resource/visual-identity/data.json")
      .then(response => {
        console.log(response)
        if(response.ok){
          console.log('TEM');
          response.json()
            .then(data => {
              _setTheme('default', data)
            })
            .catch(error => console.log('ops 1', error));
        }
        else{
          console.log('NAO TEM');
          _setTheme('default', THEME_CONSTANTS.DEFAULT_THEME);
        }
      })
      .catch(error => {
        console.log('ops', error);
        _setTheme('default', THEME_CONSTANTS.DEFAULT_THEME);
      });


    function _setTheme(themeName, theme){
      console.log(JSON.stringify(theme, null, 2))//.

      $mdThemingProvider.theme(themeName)
        .primaryPalette(theme.primary.main, theme.primary.pallete)
        .accentPalette(theme.accent.main, theme.accent.pallete)
        .warnPalette(theme.warn.main, theme.warn.pallete)
        .backgroundPalette(theme.background);
    }

  }
}());
