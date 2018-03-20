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
        _rest = OtusRestResourceService.getMonitoringResource();
      }
  
      function create() {
        console.log(_rest);
      }
  

    }
  }());