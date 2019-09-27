(function() {
  'use strict';

  angular
    .module('otusjs.participant.model')
    .factory('otusjs.participant.model.Participant', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    self.OBJECT_TYPE = 'Participant';

    /* Public methods */
    self.create = create;
    self.fromJsonObject = fromJsonObject;

    function create(options) {
      return new Participant(options);
    }

    function fromJsonObject(jsonObject) {
      return new Participant(jsonObject);
    }

    return self;
  }

  function Participant(options) {
    var self = this;
    var _id = options.id;
    var _name = options.name;
    var _surname = options.surname;
    var _fieldCenter = options.fieldCenter;

    /* Public methods */
    function getID() {
      return _id;
    }

    function getName() {
      return _name;
    }

    function getSurname() {
      return _surname;
    }

    function getFieldCenter() {
      return _fieldCenter;
    }

    function toJson() {
      var json = {};

      json.id = getID();
      json.name = getName();
      json.surname = getSurname();
      json.email = getFieldCenter();

      return JSON.stringify(json);
    }
  }
}());
