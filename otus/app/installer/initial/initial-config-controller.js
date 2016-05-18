(function() {
  'use strict';

  angular
    .module('otus.installer')
    .controller('InitialConfigController', InitialConfigController);

  InitialConfigController.$inject = ['$q', '$scope', 'mdDialog'];

  function InitialConfigController($q, $scope, $mdDialog) {

    var installerResource;

    init();

    function init() {

    }

    $scope.register = function(systemConf) {
      
    }
  }
})();
