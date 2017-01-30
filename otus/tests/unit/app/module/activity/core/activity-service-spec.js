describe('otusjs.activity.business.ParticipantActivityService', function() {

  var UNIT_NAME = 'otusjs.activity.business.ParticipantActivityService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      mockActivityContextService(_$injector_);
      mockActivityCollectionService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('add method', function() {

    it('should call ActivityCollectionService.add method', function() {
      spyOn(Mock.ActivityCollectionService, 'add');

      service.add([]);

      expect(Mock.ActivityCollectionService.add).toHaveBeenCalledWith([]);
    });

  });

  describe('listAll method', function() {

    it('should call ActivityCollectionService.listAll method', function() {
      spyOn(Mock.ActivityCollectionService, 'listAll');

      service.listAll();

      expect(Mock.ActivityCollectionService.listAll).toHaveBeenCalledWith();
    });

  });

  describe('listAvailables method', function() {

    it('should call ActivityCollectionService.listAvailables method', function() {
      spyOn(Mock.ActivityCollectionService, 'listAvailables');

      service.listAvailables();

      expect(Mock.ActivityCollectionService.listAvailables).toHaveBeenCalledWith();
    });

  });

  describe('selectActivities method', function() {

    it('should call ActivityContextService.selectActivities method', function() {
      spyOn(Mock.ActivityContextService, 'selectActivities');

      service.selectActivities([]);

      expect(Mock.ActivityContextService.selectActivities).toHaveBeenCalledWith([]);
    });

  });

  describe('getSelectedActivities method', function() {

    it('should return an object with list method defined', function() {
      var returnedObject = service.getSelectedActivities();

      expect(returnedObject.list).toBeDefined();
    });

    it('should return an object with remove method defined', function() {
      var returnedObject = service.getSelectedActivities();

      expect(returnedObject.remove).toBeDefined();
    });


  });

  describe('getSelectedParticipant method', function() {

    it('should call ActivityContextService.getSelectedParticipant method', function() {
      spyOn(Mock.ActivityContextService, 'getSelectedParticipant');

      service.getSelectedParticipant();

      expect(Mock.ActivityContextService.getSelectedParticipant).toHaveBeenCalledWith();
    });

  });

  function mockActivityContextService($injector) {
    Mock.ActivityContextService = $injector.get('otusjs.activity.core.ContextService');
    Injections.ActivityContextService = Mock.ActivityContextService;
  }

  function mockActivityCollectionService($injector) {
    Mock.ActivityCollectionService = $injector.get('otusjs.activity.repository.ActivityRepositoryService');
    Injections.ActivityCollectionService = Mock.ActivityCollectionService;
  }

});
