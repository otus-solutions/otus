(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.aliquot')
    .service('otusjs.laboratory.aliquot.AliquotManagerService', service);

  service.$inject = [
      'otusjs.laboratory.aliquot.MomentTypeManagerFactory'
    ];

  function service(MomentTypeManagerFactory) {
    var self = this;
    var _momentTypeList = [];

    /* Public Interface*/
    self.buildMomentTypeList = buildMomentTypeList;

    function _buildMomentTypeList(tubeList) {
      console.log('otus');
      _momentTypeList = [];
      tubeList.forEach(function(tube) {
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

    function buildMomentTypeList(tubeList) {
      _buildMomentTypeList(tubeList);
      return _momentTypeList;
    }

  }
}());
