(function() {
  'use strict';

  angular
    .module('otusjs.laboratory')
    .service('otusjs.laboratory.AliquotManagerService', service);

  service.$inject = [
      'otusjs.laboratory.MomentTypeManagerFactory'
    ];

  function service(MomentTypeManagerFactory) {
    var self = this;
    var _momentTypeList = [];

    /* Public Interface*/
    self.getMomentTypeList = getMomentTypeList;
    self.initialize = initialize;

    function initialize(tubeList) {
      _buildMap(tubeList);
    }

    function _buildMap(tubeList) {
      tubeList.forEach(function(tube) {
        var moment = tube.moment;
        var type = tube.type;

        var momentType = _momentTypeList.find(function(momentType) {
           return momentType.type == tube.type && momentType.moment == tube.moment;
        });
        if (momentType) {
           momentType.addTube(tube);
        } else {
           var newMomentType = _buildMomentType(tube);
           newMomentType.addTube(tube);
           _momentTypeList.push(newMomentType);
        }
      });

      function _buildMomentType(tube) {
         var availableAliquots = tube.availableAliquots;
         var newMomentType = MomentTypeManagerFactory.create(tube);
         newMomentType.setAvailableAliquots(availableAliquots);
         return newMomentType;
      }
    }

    function getMomentTypeList() {
      return _momentTypeList;
    }

  }
}());
