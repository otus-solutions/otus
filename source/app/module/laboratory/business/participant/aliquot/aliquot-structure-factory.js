(function () {

  'use strict';

  angular
    .module('otusjs.laboratory.business.participant.aliquot')
    .factory('AliquotStructureFactory', Factory);


  function Factory() {
    var self = this;

    self.create = create;

    function create(aliquot) {
      return new AliquotStructure(aliquot);
    }

    return self;
  }

  function AliquotStructure(aliquot) {
    var self = this;

    self.toJSON = toJSON;
    self.toEmptyJSON = toEmptyJSON;

    self.aliquotCode = aliquot.aliquotCode || "";
    self.role = aliquot.role || "";
    self.index = aliquot.index || "";
    self.aliquotId = self.role + "Aliquot" + self.index;
    self.tubeCode = aliquot.tubeCode || "";
    self.container = aliquot.container || "";
    self.containerLabel = aliquot.containerLabel || "";
    self.date = aliquot.date || "";
    self.isSaved = false;
    self.name = aliquot.name || "";
    self.label = aliquot.label ? aliquot.label : self.name;
    self.operator = aliquot.operator || "";
    self.placeholder = aliquot.placeholder || "";
    self.processing = aliquot.processing || "";
    self.time = aliquot.time || "";
    self.tubeId = self.role + "Tube" + self.index;
    self.tubeMessage = aliquot.tubeMessage || "";
    self.locationPoint = ""

    function toJSON() {
      return {
        aliquotCode: self.aliquotCode,
        aliquotId: self.aliquotId,
        tubeCode: self.tubeCode,
        container: self.container,
        containerLabel: self.label,
        date: self.date,
        index: self.index,
        isSaved: self.isSaved,
        label: self.label,
        name: self.name,
        operator: self.operator,
        placeholder: self.tubeCode,
        processing: self.processing,
        role: self.role,
        time: self.time,
        tubeId: self.tubeId,
        tubeMessage: self.tubeMessage,
        locationPoint: self.locationPoint
      };
    }
    function toEmptyJSON() {
      return {
        aliquotCode: "",
        aliquotId: self.aliquotId,
        tubeCode: "",
        container: "",
        containerLabel: self.label,
        date: "",
        index: self.index,
        isSaved: false,
        label: self.label,
        name: self.name,
        operator: "",
        placeholder: self.tubeCode,
        processing: "",
        role: self.role,
        time: "",
        tubeId: self.tubeId,
        tubeMessage: "",
        locationPoint: ""
      };
    }
  }
})();
