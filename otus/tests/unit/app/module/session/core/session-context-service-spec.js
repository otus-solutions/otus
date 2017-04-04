xdescribe('SessionContextService', function() {

  var UNIT_NAME = 'otusjs.application.session.core.ContextService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_, _$rootScope_) {
      mockRootScope(_$rootScope_);
      service = _$injector_.get(UNIT_NAME);
    });
  });

  describe('setScope method', function() {

    it('should store a reference to a $scope instance', function() {
      var $scope = Mock.$rootScope.$new();

      service.setScope($scope);

      expect(service.getScope()).toEqual($scope);
    });

  });

  describe('broadcast method', function() {

    var $scope = {};

    beforeEach(function() {
      $scope = Mock.$rootScope.$new();
      service.setScope($scope);
      spyOn($scope, '$broadcast');
    })

    it('should call $scope.broadcast', function() {
      service.broadcast();

      expect($scope.$broadcast).toHaveBeenCalled();
    });

  });

  function mockRootScope($rootScope) {
    Mock.$rootScope = $rootScope;
  }

});
