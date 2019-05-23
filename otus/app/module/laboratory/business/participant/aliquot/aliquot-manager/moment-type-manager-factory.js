(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.business.participant.aliquot')
    .factory('otusjs.laboratory.business.participant.aliquot.MomentTypeManagerFactory', factory);

  factory.$inject = [
    '$q',
    'AliquotStructureFactory'
  ];

  function factory($q, AliquotStructureFactory) {
    var self = this;

    self.create = create;

    function create(tube) {
      var manager = new MomentTypeManager($q, tube, AliquotStructureFactory);
      return manager;
    }

    return self;
  }

  function MomentTypeManager($q, tube, AliquotStructureFactory) {
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

    self.addTube = addTube;
    self.removeAliquot = removeAliquot;
    self.removeStorage = removeStorage;
    self.setAvailableAliquots = setAvailableAliquots;
    self.getPersistanceStructure = getPersistanceStructure;

    self.updateTubes = updateTubes;

    onInit();
    function onInit() {

    }
    function addTube(tube) {
      self.collectedAliquots = self.collectedAliquots.concat(tube.aliquots);
      self.tubeList.push(tube);
    }

    function setAvailableAliquots(availableAliquots) {
      self.availableAliquots = availableAliquots;
    }

    function getPersistanceStructure(newAliquotsArray) {
      var persistanceStructure = {tubes: _buildTubeArray(newAliquotsArray)};
      _tubesToUpdate = persistanceStructure.tubes;
      return JSON.stringify(persistanceStructure);
    }

    function updateTubes() {
      _tubesToUpdate.forEach(function (tubeSet) {
        var tube = _findTube(tubeSet.code);
        tubeSet.aliquots.forEach(function (aliquot) {
          tube.pushAliquot(aliquot);
          self.collectedAliquots.push(aliquot);
        });
      });
      _tubesToUpdate = undefined;
    }

    function _buildTubeArray(newAliquotsArray) {
      var preStructure = _buildPreStructure(newAliquotsArray);
      preStructure.forEach(function (tubeSet) {
        var tube = _findTube(tubeSet.code);
        tubeSet.rawAliquots.forEach(function (aliquot) {
          tubeSet.aliquots.push(tube.toAliquot(aliquot));
        });
        delete tubeSet.rawAliquots;
      });
      return preStructure;
    }

    function _findTube(tubeCode) {
      return self.tubeList.find(function (tube) {
        return tube.code === tubeCode;
      });
    }

    function _buildPreStructure(aliquotsArray) {
      var maps = [];
      aliquotsArray.forEach(function (aliquot) {
        var thisMap = maps.find(function (map) {
          return map.code === aliquot.tubeCode;
        });
        if (thisMap) {
          thisMap.rawAliquots.push(aliquot);
        } else {
          var newMap = {
            code: aliquot.tubeCode,
            rawAliquots: [],
            aliquots: []
          };
          newMap.rawAliquots.push(aliquot);
          maps.push(newMap);
        }
      });
      return maps;
    }

    function removeAliquot(aliquotRemoved) {
      var index;

      var _participantAliquot = self.collectedAliquots.find(function (aliquot) {
        return aliquot.code == aliquotRemoved.code;
      });

      index = self.collectedAliquots.indexOf(_participantAliquot);
      self.collectedAliquots.splice(index, 1);
      if (aliquotRemoved.isConverted){
        _removeConverted(aliquotRemoved.code);
      } else if (_participantAliquot.role === "EXAM") {
        _removeExam(aliquotRemoved.code);
      } else if (_participantAliquot.role === "STORAGE") {
        removeStorage(aliquotRemoved.code);
      }
    }

    function _removeExam(code) {
      var index;

      var _aliquot = self.exams.find(function (exam) {
        return exam.aliquotCode === code;
      });

      var _originalExam = self.originalExams.find(function (examFound) {
        return examFound.aliquotCode === code;
      });

      index = self.originalExams.indexOf(_originalExam);
      self.originalExams.splice(index, 1, AliquotStructureFactory.create(_originalExam).toEmptyJSON());

      index = self.exams.indexOf(_aliquot);
      self.exams.splice(index, 1, AliquotStructureFactory.create(_aliquot).toEmptyJSON());
    }

    function _removeConverted(code) {
      var index;

      var _aliquot = self.convertedStorages.find(function (exam) {
        return exam.aliquotCode === code;
      });

      index = self.convertedStorages.indexOf(_aliquot);
      self.convertedStorages.splice(index, 1);
    }

    function removeStorage(code) {
      var index;

      var _aliquot = self.storages.find(function (exam) {
        return exam.aliquotCode === code;
      });
      var _originalStorages = self.originalStorages.find(function (exam) {
        return exam.aliquotCode === code;
      });
      index = self.originalStorages.indexOf(_originalStorages);
      self.originalStorages.splice(index, 1, AliquotStructureFactory.create(_originalStorages).toEmptyJSON());

      index = self.storages.indexOf(_aliquot);
      self.storages.splice(index, 1, AliquotStructureFactory.create(_aliquot).toEmptyJSON());
    }

  }
}());
