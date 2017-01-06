describe('otusjs.user.access.service.UserCollectionService', function() {

  var UNIT_NAME = 'otusjs.user.access.service.UserCollectionService';
  var Mock = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      mockDataSource();

      service = _$injector_.get(UNIT_NAME);
    });
  });

  describe('connectTo method', function() {

    it('should call dataSource.up', function() {
      service.connectTo(Mock.dataSource);

      expect(Mock.dataSource.up).toHaveBeenCalledWith();
    });

  });

  describe('authenticateUserData method', function() {

    it('should call dataSource.authenticateUserData', function() {
      var userData = {};

      service.connectTo(Mock.dataSource);
      service.authenticateUserData(userData);

      expect(Mock.dataSource.authenticateUserData).toHaveBeenCalledWith(userData);
    });

  });

  function mockDataSource() {
    Mock.dataSource = {};
    Mock.dataSource.up = jasmine.createSpy();
    Mock.dataSource.authenticateUserData = jasmine.createSpy();
  }

});
