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
    var _tubesToUpdate;

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
    self.updateTubes = updateTubes;

    onInit();

    function onInit() {}

    function addTube(tube) {
      self.collectedAliquots = self.collectedAliquots.concat(tube.aliquots);
      self.tubeList.push(tube);
    }

    function setAvailableAliquots(availableAliquots) {
      self.availableAliquots = availableAliquots;
    }


    function getPersistanceStructure(newAliquotsArray) {
      var persistanceStructure = {tubes:_buildTubeArray(newAliquotsArray)};
      _tubesToUpdate = persistanceStructure.tubes;
      return JSON.stringify(persistanceStructure);
    }

    function updateTubes() {
       _tubesToUpdate.forEach(function(tubeSet) {
          var tube = _findTube(tubeSet.code);
          tubeSet.aliquots.forEach(function(aliquot) {
             tube.pushAliquot(aliquot);
             self.collectedAliquots.push(aliquot);
          });
       });
       _tubesToUpdate = undefined;
    }

    function _buildTubeArray(newAliquotsArray) {
      var preStructure = _buildPreStructure(newAliquotsArray);

      preStructure.forEach(function(tubeSet) {
        var tube = _findTube(tubeSet.code);
        tubeSet.rawAliquotes.forEach(function(aliquot) {
          tubeSet.aliquots.push(tube.toAliquot(aliquot));
        });
        delete tubeSet.rawAliquotes;
      });

      return preStructure;
    }

    function _findTube(tubeCode) {
      return self.tubeList.find(function(tube) {
        return tube.code === tubeCode;
      });
    }

    function _buildPreStructure(aliquotsArray) {
      var maps = [];

      aliquotsArray.forEach(function(aliquot) {
        var thisMap = maps.find(function(map) {
          return map.code === aliquot.tubeCode;
        });
        if (thisMap) {
          thisMap.rawAliquotes.push(aliquot);
        } else {
          var newMap = {
            code: aliquot.tubeCode,
            rawAliquotes: [],
            aliquots: []
          };
          newMap.rawAliquotes.push(aliquot);
          maps.push(newMap);
        }
      });
      console.log(maps);
      return maps;
    }

  }
}());
