xdescribe('otusjs.otus.scope.ScopeFactory', function() {

  var UNIT_NAME = 'otusjs.otus.scope.ScopeFactory';
  var Mock = {};
  var Injections = {};
  var factory = {};

  beforeEach(function() {
    module('otusjs.otus.scope');

    inject(function(_$injector_, _$rootScope_) {
      /* Injectable mocks */
      mockRootScope(_$rootScope_);

      factory = _$injector_.get(UNIT_NAME, Injections);
    });

  });

  describe('create method', function() {

    it('should return an instance of Scope', function() {
      var value = factory.create();

      expect(value.constructor.name).toBe('Scope');
    });

  });

  function mockRootScope($rootScope) {
    Mock.$scope = $rootScope.$new();
    Mock.$scope.$new = jasmine.createSpy();

    Mock.$rootScope = $rootScope;
    Mock.$rootScope.$new = jasmine.createSpy().and.returnValue(Mock.$scope);

    Injections.$rootScope = Mock.$rootScope;
  }

});
