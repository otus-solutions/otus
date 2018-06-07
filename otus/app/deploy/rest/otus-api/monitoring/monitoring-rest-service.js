(function () {
    'use strict';
  
    angular
      .module('otusjs.deploy')
      .service('otusjs.deploy.MonitoringRestService', Service);
  
    Service.$inject = [
      'OtusRestResourceService'
    ];
  
    function Service(OtusRestResourceService) {
      var self = this;
      var _rest = null;
      var _uploadRest = null;
  
      /* Public methods */
      self.initialize = initialize;
      self.create = create;
  
      function initialize() {
        _rest = OtusRestResourceService.getOtusMonitoringResource();
      }
  
      function list() {
        if (!_rest) {
          throw new Error('REST resource is not initialized.');
        }
        return _rest.list().$promise;
      }

      /*
      function create() {
        console.log(_rest);
      }*/
  

    }
  }());