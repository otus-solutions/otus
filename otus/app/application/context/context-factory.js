(function() {
  'use strict';

  angular
    .module('otusjs.application.context')
    .factory('otusjs.application.context.ContextFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create(name) {
      return new Context(name);
    }

    return self;
  }

  function Context(name) {
    var self = this;
    var _name = name;
    var _data = {};

    /* Public methods */
    self.getName = getName;
    self.getData = getData;
    self.setData = setData;
    self.removeData = removeData;
    self.clear = clear;
    self.toJson = toJson;
    self.fromJson = fromJson;
    self.toObject = toObject;

    function getName() {
      return _name;
    }

    function getData(dataKey) {
      return _data[dataKey];
    }

    function setData(dataKey, dataValue) {
      _data[dataKey] = dataValue;
    }

    function removeData(dataKey) {
      delete _data[dataKey];
    }

    function clear() {
      _data = {};
    }

    function toJson() {
      return JSON.stringify(_data);
    }

    function fromJson(json) {
      _data = JSON.parse(json) || {};
    }

    function toObject() {
      return _context;
    }
  }
}());
