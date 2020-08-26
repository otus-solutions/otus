(function() {
  'use strict';

  angular
    .module('otusjs.application.theme')
    .config(Configuration);

  Configuration.$inject = [
    '$mdThemingProvider',
    '$mdIconProvider',
    'THEME_CONSTANTS',
    'THEME_STYLES_REGISTER'
  ];

  function Configuration($mdThemingProvider, $mdIconProvider, THEME_CONSTANTS, THEME_STYLES_REGISTER) {

    /* Configuration icons - 24 is the size default of icons */
    $mdIconProvider.defaultIconSet(THEME_CONSTANTS.imageURLs.icons.mdi, 24);

    if(THEME_CONSTANTS.palette){
      for(let [paletteName, palette] of Object.entries(THEME_CONSTANTS.palette)){
        const newMap = $mdThemingProvider.extendPalette(palette.baseName, palette.map);
        $mdThemingProvider.definePalette(paletteName, newMap);
      }
    }

    const theme = THEME_CONSTANTS.theme;
    $mdThemingProvider.theme('default')
      .primaryPalette(theme.primary.main, theme.primary.pallete)
      .accentPalette(theme.accent.main, theme.accent.pallete)
      .warnPalette(theme.warn.main, theme.warn.pallete)
      .backgroundPalette(theme.background);

    $mdThemingProvider.alwaysWatchTheme(true);

    THEME_STYLES_REGISTER.REGISTERED_STYLES.forEach(style => {
      $mdThemingProvider.registerStyles(style);
    });
  }

}());
