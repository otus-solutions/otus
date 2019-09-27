(function() {
  'use strict';

  angular
    .module('otusjs.deploy')
    .service('otusjs.deploy.SurveyItemRestService', Service);

  Service.$inject = [
    '$q',
    'OtusRestResourceService'
  ];

  function Service($q, OtusRestResourceService) {
    var self = this;
    var _rest = null;

    /* Public methods */
    self.initialize = initialize;
    self.list = list;
    self.getByID = getByID;

    function initialize() {
      _rest = OtusRestResourceService.getDatasourceResourceFactory();
    }

    function list() {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.list();
    }

    function getByID(id) {
      if (!_rest) {
        throw new Error('REST resource is not initialized.');
      }

      return _rest.getByID(id);
    }
  }
}());
