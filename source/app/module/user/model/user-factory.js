(function() {
  'use strict';

  angular
    .module('otusjs.user.model')
    .factory('otusjs.user.model.User', Factory);

  Factory.$inject = [];

  function Factory() {
    var self = this;

    self.OBJECT_TYPE = 'User';

    /* Public methods */
    self.create = create;
    self.fromJsonObject = fromJsonObject;

    function create(options) {
      return new User(options);
    }

    function fromJsonObject(jsonObject) {
      return new User(jsonObject);
    }

    return self;
  }

  function User(options) {
    var self = this;
    var _id = options.id;
    var _uuid = options.uuid;
    var _name = options.name;
    var _surname = options.surname;
    var _email = options.email;
    var _phone = options.phone;
    var _token = options.token;

    /* Public methods */
    function getID() {
      return _id;
    }

    function getUUID() {
      return _uuid;
    }

    function getName() {
      return _name;
    }

    function getSurname() {
      return _surname;
    }

    function getEmail() {
      return _email;
    }

    function getPhone() {
      return _phone;
    }

    function getToken() {
      return _token;
    }

    function toJson() {
      var json = {};

      json.id = getID();
      json.uuid = getUUID();
      json.name = getName();
      json.surname = getSurname();
      json.email = getEmail();
      json.phone = getPhone();
      json.token = getToken();

      return JSON.stringify(json);
    }
  }
}());
