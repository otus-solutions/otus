(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.PlayerLabelMaker', Service);

  Service.$inject = [
    'otusjs.labelMaker.setupView.setupComponent'
  ];

  function Service(setupComponent) {
    var self = this;

    /* Public methods */
    self.setup = setup;

    function setup() {
      //setupComponent.generateLabelPage();
    }
  }
}());
