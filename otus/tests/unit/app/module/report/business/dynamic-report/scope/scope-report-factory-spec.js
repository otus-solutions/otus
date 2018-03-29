describe('the Scope Report factory ', function () {
  var Mock = {};
  var factory = {};
  var scope;

  beforeEach(function () {
    angular.mock.module('otusjs.otus.report');
    inject(function (_$injector_, _$rootScope_) {
      var injections = {
        '$rootScope': _$rootScope_,
        'ScopeHelperService': _$injector_.get(
          'otusjs.report.business.dynamicReport.scope.ScopeHelperService'
        )
      };
      factory = _$injector_.get(
        'otusjs.report.business.dynamicReport.scope.ScopeReportFactory',
        injections
      );
      //TODO: call mocks
    });
  });

  describe('the creation method ', function () {
    beforeEach(function () {
      mockScopeReport();
    });
    it('should create scope report', function () {
      expect(Mock.ScopeReport.objectType).toEqual('ScopeReport');
    });
    it('should have the required attribute on object', function () {
      expect(Mock.ScopeReport.scope.required).not.toEqual(undefined);
    });
  });

  describe('required method ', function () {
    beforeEach(function () {
      mockScopeReport();
      mockFieldValid();
      mockFieldValid2();
      mockFieldInvalid();
      mockFieldInvalid2();
      mockRequired(Mock.FieldValid);
      mockRequired(Mock.FieldInvalid);
    });
    it('the fieldRequiredArray.length should be equal to 2', function () {
      expect(Mock.ScopeReport.scope.fieldRequiredArray.length).toEqual(2);
    });
    it('the fieldsError.length should be equal to 1', function () {
      expect(Mock.ScopeReport.scope.fieldsError.length).toEqual(1);
    });
    it('the fieldsError.length should be equal to 2', function () {
      mockRequired(Mock.FieldInvalid2);
      expect(Mock.ScopeReport.scope.fieldsError.length).toEqual(2);
    });
    it('the fieldsError[1] should be equal to FieldInvalid2', function () {
      mockRequired(Mock.FieldInvalid2);
      expect(Mock.ScopeReport.scope.fieldsError[1].fieldName).toEqual(Mock.FieldInvalid2.fieldName);
      expect(Mock.ScopeReport.scope.fieldsError[1].valid).toEqual(Mock.FieldInvalid2.valid);
      expect(Mock.ScopeReport.scope.fieldsError[1].value).toEqual(Mock.FieldInvalid2.value);
      expect(Mock.ScopeReport.scope.fieldsError[1].msg).toEqual(Mock.FieldInvalid2.msg);
    });
  });

  function mockScopeReport() {
    Mock.ScopeReport = factory.create();
  }

  function mockFieldValid() {
    Mock.FieldValid = {
      fieldName: "campoValido",
      valid: true,
      value: "valor",
      msg: "é obrigatório",
    };
  }

  function mockFieldValid2() {
    Mock.FieldValid2 = {
      fieldName: "campoValido2",
      valid: true,
      value: "valor2",
      msg: "é obrigatório",
    };
  }

  function mockFieldInvalid() {
    Mock.FieldInvalid = {
      fieldName: "campoInvalido",
      valid: false,
      value: [],
      msg: "é obrigatório",
    };
  }

  function mockFieldInvalid2() {
    Mock.FieldInvalid2 = {
      fieldName: "campoInvalido2",
      valid: false,
      value: {},
      msg: "é obrigatório",
    };
  }

  function mockRequired(field) {
    Mock.ScopeReport.scope.required(field.fieldName, field.value, field.msg);
  }

});
