describe('StaticVariableDataSourceRequestFactory', function () {
  var Mock = {};
  var factory;
  var UNIT_NAME = 'otusjs.deploy.staticVariable.StaticVariableDataSourceRequestFactory';

  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    mock();

    inject(function (_$injector_) {
      factory = _$injector_.get(UNIT_NAME);
    });
  });
  describe('the object created', function () {
    it('should be defined with defined fields', function () {
      var variableRequest = factory.create(Mock.recruitmentNumber, Mock.variableList);
      expect(variableRequest).toBeDefined();
      expect(variableRequest.identification).toBeDefined();
      expect(variableRequest.variables).toBeDefined();
      expect(variableRequest.variables[0]).toBeDefined();
      expect(variableRequest.variables[0].name).toEqual("var1");
      expect(variableRequest.variables[0].sending).toEqual("onda 1");
    })
  });


  function mock() {
    Mock.recruitmentNumber = 3025653;
    Mock.variableList = [
      {
        name: "var1",
        sending: "onda 1"
      }
    ]
  }

});
