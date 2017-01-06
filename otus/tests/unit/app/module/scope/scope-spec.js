xdescribe('Scope object', function() {

  var UNIT_NAME = 'otusjs.otus.scope.ScopeFactory';
  var EVENT_NAME = 'event_name';
  var EVENT_DATA = { name: 'event data' };
  var Mock = {};
  var Injections = {};
  var factory = {};
  var scope = null;

  beforeEach(function() {
    module('otusjs.otus.scope');

    inject(function(_$injector_, _$rootScope_) {
      /* Injectable mocks */
      mockRootScope(_$rootScope_);

      factory = _$injector_.get(UNIT_NAME, Injections);
      scope = factory.create();
    });
  });

  describe('emit method', function() {

    describe('when scope is initialized', function() {

      it('should use $emit method from ngScope', function() {
        // spyOn(Mock.$scope, '$emit');

        scope.emit(EVENT_NAME, EVENT_DATA);

        // expect(Mock.$scope.$emit).toHaveBeenCalledWith(EVENT_NAME, EVENT_DATA);
      });

    });

  });

  function mockRootScope($rootScope) {
    Mock.$scope = $rootScope.$new();

    Mock.$rootScope = $rootScope;
    Mock.$rootScope.$new = jasmine.createSpy().and.returnValue(Mock.$scope);

    Injections.$rootScope = Mock.$rootScope;
  }

});
