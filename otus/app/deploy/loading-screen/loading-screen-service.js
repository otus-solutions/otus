(function () {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.LoadingScreenService', Service);

  Service.$inject = [];

  function Service() {
    const LOGO_SOURCE = "app/static-resource/image/coruja_pesquisadora.png";
    const BACKGROUND_COLOR = "#009688";
    const MESSAGE = "Por favor, aguarde o carregamento.";

    var self = this;
    /* Lifecycle hooks */
    self.$onInit = onInit;
    /* Public methods */
    self.start = start;
    self.finish = finish;
    self.changeMessage = changeMessage;

    onInit();

    /* Lifecycle methods */
    function onInit() {
      self.loading_screen = null;
      changeMessage();
    }

    function start() {
      if (!self.loading_screen)
        _constructor();
    }

    function finish() {
      if (self.loading_screen) {
        self.loading_screen.finish();
        self.loading_screen = null;
      }
    }

    function changeMessage(message) {
      self.message = message !== undefined ? message : MESSAGE;
    }

    function _constructor() {
      self.loading_screen = pleaseWait({
        logo: LOGO_SOURCE,
        backgroundColor: BACKGROUND_COLOR,
        loadingHtml: "<p class='loading-message' style='color:#FFF;'>" + self.message + "</p>" +
        "<div class='sk-circle'>" +
        "<div class='sk-circle1 sk-child'></div>" +
        "<div class='sk-circle2 sk-child'></div>" +
        "<div class='sk-circle3 sk-child'></div>" +
        "<div class='sk-circle4 sk-child'></div>" +
        "<div class='sk-circle5 sk-child'></div>" +
        "<div class='sk-circle6 sk-child'></div>" +
        "<div class='sk-circle7 sk-child'></div>" +
        "<div class='sk-circle8 sk-child'></div>" +
        "<div class='sk-circle9 sk-child'></div>" +
        "<div class='sk-circle10 sk-child'></div>" +
        "<div class='sk-circle11 sk-child'></div>" +
        "<div class='sk-circle12 sk-child'></div>" +
        "</div>"
      });
    }
  }

}());
