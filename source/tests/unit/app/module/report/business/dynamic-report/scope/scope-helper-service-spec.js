describe('the Scope Helper service ', function () {
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
    });
  });

  describe('fillScopeHelper method ', function () {
    beforeEach(function () {
      mockScope();
      service.fillScopeHelper(Mock.Scope);
    });
    it('the scope should have "helper" sctructure', function () {
      expect(Mock.Scope.helper).not.toBe(undefined);
    });
    it('the scope.helper should have "formatDate" method', function () {
      expect(typeof Mock.Scope.helper.formatDate).toEqual("function");
    });
    it('the scope.helper should have "getObjectByArray" method', function () {
      expect(typeof Mock.Scope.helper.getObjectByArray).toEqual("function");
    });
  });

  describe('formatDate method ', function () {
    beforeEach(function () {
      mockDate();
      mockDateISOString();
      mockScopeWithHelper();
    });
    it('the return should be equal to "02/04/2018"', function () {
      expect(Mock.ScopeWithHelper.helper.formatDate(Mock.Date)).toEqual("02/04/2018");
    });
    it('the return should be equal to "2018/04/02-12:37:55"', function () {
      expect(Mock.ScopeWithHelper.helper.formatDate(Mock.DateISOString, 'yyyy/MM/dd-hh:mm:ss')).toEqual("2018/04/02-12:37:55");
    });
  });

  describe('getObjectByArray method ', function () {
    beforeEach(function () {
      mockScopeWithHelper();
      mockItensArray();
    });
    it('(1)should return undefined', function () {
      let item = Mock.ScopeWithHelper.helper.getObjectByArray(Mock.ItensArray, 'a');
      expect(item).toBe(undefined);
    });
    it('(2)should return undefined', function () {
      let item = Mock.ScopeWithHelper.helper.getObjectByArray(Mock.ItensArray, 'other');
      expect(item).toBe(undefined);
    });
    it('(3)should return undefined', function () {
      let item = Mock.ScopeWithHelper.helper.getObjectByArray(Mock.ItensArray, { 'a': 1, 'other': undefined });
      expect(item).toBe(undefined);
    });
    it('(4)should return undefined', function () {
      let item = Mock.ScopeWithHelper.helper.getObjectByArray(Mock.ItensArray, { 'a': 1, 'b': 999999 });
      expect(item).toBe(undefined);
    });
    it('(1)should return the searched item', function () {
      let item = Mock.ScopeWithHelper.helper.getObjectByArray(Mock.ItensArray, 'a', 1);
      expect(item).toEqual(Mock.ItensArray[0]);
    });
    it('(2)should return the searched item', function () {
      let item = Mock.ScopeWithHelper.helper.getObjectByArray(Mock.ItensArray, { 'a': 4, 'b': 5, 'c': 6 });
      expect(item).toEqual(Mock.ItensArray[1]);
    });
  });

  describe('parseToRetinographyImage method', function () {
    beforeEach(function () {
      mockScopeWithHelper();
      mockImagens();
      spyOn(Mock.ScopeWithHelper.helper, 'formatDate').and.callThrough();
    });

    it('should called method formatDate', function () {
      var response = Mock.ScopeWithHelper.helper.parseToRetinographyImage(Mock.imagens);

      expect(response[0].date).toBe('09/09/2019');
    });

    it('should called method _translateEye', function () {
      var response = Mock.ScopeWithHelper.helper.parseToRetinographyImage(Mock.imagens);

      expect(response[0].eye).toBe('Esquerdo');
    });

    it('should create url with value of url expected', function () {
      var response = Mock.ScopeWithHelper.helper.parseToRetinographyImage(Mock.imagens);

      expect(response[0].url.includes('blob:http://')).toBe(true);
    });
  });

  function mockScope() {
    Mock.Scope = {};
  }

  function mockScopeWithHelper() {
    Mock.ScopeWithHelper = {}
    service.fillScopeHelper(Mock.ScopeWithHelper);
  }

  function mockDate() {
    Mock.Date = new Date(2018, 3, 2, 12, 37, 55, 0);
  }

  function mockDateISOString() {
    if (!Mock.Date) mockDate();
    Mock.DateISOString = Mock.Date.toISOString();
  }

  function mockItensArray() {
    Mock.ItensArray = [
      { a: 1, b: 2, c: 3 },
      { a: 4, b: 5, c: 6 },
      { a: 7, b: 8, c: 9 }
    ];
  }

  function mockImagens() {
    Mock.imagens = [
      {
        date: '2019-09-09T17:40:34.699Z',
        eye: 'left',
        result: "{\"type\":\"Buffer\",\"data\":[255,216,255,224,0,16,74,70,73,70,0,1,2,0,0,1,0,1,0,0,255]}"
      }
    ]
  }

});
