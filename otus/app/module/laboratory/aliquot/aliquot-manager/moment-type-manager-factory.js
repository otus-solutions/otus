(function() {
  'use strict';

  angular
    .module('otusjs.laboratory.aliquot')
    .factory('otusjs.laboratory.aliquot.MomentTypeManagerFactory', factory);

  factory.$inject = [
      '$q'
   ];

  function factory($q) {
    var self = this;

    self.create = create;

    function create(tube) {
      var manager = new MomentTypeManager($q, tube);
      return manager;
    }

    return self;
  }

  function MomentTypeManager($q, tube) {
    var self = this;

    /* Public Interface */
    self.type = tube.type;
    self.moment = tube.moment;
    self.momentLabel = tube.momentLabel;
    self.typeLabel = tube.typeLabel;
    self.boxColor = tube.boxColor;
    self.collectedAliquots = [];
    self.availableAliquots = [];
    self.tubeList = [];

    //

    self.addTube = addTube;
    self.setAvailableAliquots = setAvailableAliquots;
    self.getPersistanceStructure = getPersistanceStructure;

    onInit();

    function onInit() {}

    function addTube(tube) {
      self.collectedAliquots = self.collectedAliquots.concat(tube.aliquots);
      self.tubeList.push(tube);
    }

    function setAvailableAliquots(availableAliquots) {
      self.availableAliquots = availableAliquots;
    }


    function getPersistanceStructure(aliquotsArray, forceResult) {
      var persistanceStructure = _buildPersistanceStructure(aliquotsArray);
      return persistanceStructure;
    }

    function _buildPersistanceStructure(aliquotsArray) {
      var auxTubeList = angular.copy(self.tubeList);

      var tubeMaps = _buildMaps();
      tubeMaps.forEach(function(tubeMap) {
        var tube = _findTube(auxTubeList, tubeMap.tubeCode);
        tubeMap.aliquotsArray.forEach(function(aliquot) {
          tube.toAliquot(aliquot);
        });
      });

      var returning = {tubes: auxTubeList};
      return JSON.stringify(returning);

      function _buildMaps() {
        var maps = [];

        aliquotsArray.forEach(function(aliquot) {
          var thisMap = maps.find(function(map) {
            return map.tubeCode === aliquot.tubeCode;
          });
          if (thisMap) {
            thisMap.aliquotsArray.push(aliquot);
          } else {
            var newMap = {
              tubeCode: aliquot.tubeCode,
              aliquotsArray: []
            };
            newMap.aliquotsArray.push(aliquot);
            maps.push(newMap);
          }
        });
        return maps;
      }

      function _findTube(tubeArray, tubeCode) {
        return tubeArray.find(function(tube) {
          return tube.code === tubeCode;
        });
      }
    }
  }
}());
