(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .provider('otusjs.deploy.ErrorState', Provider);

  Provider.$inject = [
    'STATE'
  ];

  function Provider(STATE) {
    var self = this;

    self.$get = [provider];

    function provider() {
      return self;
    }

    self.state = {
      name: STATE.ERROR,
      template: '<otus-error flex></otus-error>',
      onEnter: _onEnter

    };

    function _onEnter() {
      Application
        .isDeployed()
        .then(function() {
          throw {message:"System not available.", stack:"Browser incorrect."};
        });
    }


    _onEnter.$inject = [
    ];
  }
}());
