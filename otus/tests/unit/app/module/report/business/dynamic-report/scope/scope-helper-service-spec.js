xdescribe('the Scope Helper service ', function () {
  var Mock = {};
  var service = {};
  var scope;

  beforeEach(function () {
    angular.mock.module('otusjs.otus.report');
    inject(function (_$injector_, _$filter_) {
      var injections = {
        '$filter': _$filter_
      };
      service = _$injector_.get(
        'otusjs.report.business.dynamicReport.scope.ScopeHelperService',
        injections
      );
      //TODO: call mocks
    });
  });

  describe('the creation method ', function () {
    beforeEach(function () {
      mockHelper();
    });
    it('should create scope report', function () {
      expect(Mock.Helper.objectType).toEqual('Helper');
    });
    it('should have the required attribute on object', function () {
      expect(Mock.Helper.scope.required).not.toEqual(undefined);
    });
  });

  describe('required method ', function () {
    beforeEach(function () {
      mockHelper();
      mockFieldValid();
      mockFieldValid2();
      mockFieldInvalid();
      mockFieldInvalid2();
      mockRequired(Mock.FieldValid);
      mockRequired(Mock.FieldInvalid);
    });
    it('the fieldRequiredArray.length should be equal to 2', function () {
      expect(Mock.Helper.scope.fieldRequiredArray.length).toEqual(2);
    });
    it('the fieldsError.length should be equal to 1', function () {
      expect(Mock.Helper.scope.fieldsError.length).toEqual(1);
    });
    it('the fieldsError.length should be equal to 2', function () {
      mockRequired(Mock.FieldInvalid2);
      expect(Mock.Helper.scope.fieldsError.length).toEqual(2);
    });
    it('the fieldsError[1] should be equal to FieldInvalid2', function () {
      mockRequired(Mock.FieldInvalid2);
      expect(Mock.Helper.scope.fieldsError[1].fieldName).toEqual(Mock.FieldInvalid2.fieldName);
      expect(Mock.Helper.scope.fieldsError[1].valid).toEqual(Mock.FieldInvalid2.valid);
      expect(Mock.Helper.scope.fieldsError[1].value).toEqual(Mock.FieldInvalid2.value);
      expect(Mock.Helper.scope.fieldsError[1].msg).toEqual(Mock.FieldInvalid2.msg);
    });
  });

  function mockHelper() {
    Mock.Helper = {};
  }

  function mockFillScopeHelper() {
    service.fillScopeHelper(Mock.Helper);
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
    Mock.Helper.scope.required(field.fieldName, field.value, field.msg);
  }

});
