(function () {
  'use strict';

  angular
    .module('otusjs.report.business.dynamicReport.scope')
    .factory('otusjs.report.business.dynamicReport.scope.ScopeReportFactory', factory);


  factory.$inject = [
    '$rootScope',
    'otusjs.report.business.dynamicReport.scope.ScopeHelperService'
  ];

  function factory($rootScope, ScopeHelperService) {
    var self = this;

    self.create = create;
    self.fromJson = fromJson;

    function create() {
      return new ScopeReport($rootScope, ScopeHelperService, {})
    }

    function fromJson(scopeInfo) {
      return new ScopeReport($rootScope, ScopeHelperService, scopeInfo)
    }

    return self;
  }

  function ScopeReport($rootScope, ScopeHelperService, scopeInfo) {
    var self = this;

    self.objectType = 'ScopeReport';
    self.scope = scopeInfo.scope || $rootScope.$new();
    self.setDatasource = setDatasource;

    onInit();

    function onInit() {
      if (!self.required) {
        self.scope.ds = {};
        self.scope.data = {};
        self.scope.style = {};
        self.scope.required = undefined;
        self.scope.fieldsError = [];
        self.scope.fieldRequiredArray = [];
      }
      _setRequired();
      _fillHelper();
    }

    function _valueIsValid(value) {
      let isValue = false;
      if (value !== undefined) {
        if (typeof value == 'string') {
          if (value.trim().length) isValue = true;
        } else if (Array.isArray(value)) {
          if (value.length) isValue = true;
        } else if (typeof value == 'object') {
          if (JSON.stringify(value) !== JSON.stringify({})) isValue = true;
        } else {
          isValue = true;
        }
      }
      return isValue;
    }

    function _setRequired() {
      self.scope.required = function (fieldName, value, msg) {
        var requiredStyle = { "color": "red", "content": "Joe's Task:" };
        var defaultStyle = {};
        if (self.scope.style[fieldName] === undefined) {
          var field = {
            fieldName: fieldName,
            valid: _valueIsValid(value),
            value: value,
            msg: msg
          };
          self.scope.fieldRequiredArray.push(field);
          self.scope.style[fieldName] = field.valid ? defaultStyle : requiredStyle;
          if (field.valid === false) {
            self.scope.fieldsError.push(field);
          }
        }
      }
    }

    function setDatasource(datasource) {
      self.scope.ds = datasource;
    }

    function _fillHelper() {
      ScopeHelperService.fillScopeHelper(self.scope);
    }
  }
}());
