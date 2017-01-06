describe('otusjs.activity.repository.ActivityRepositoryService', function() {

  var UNIT_NAME = 'otusjs.activity.repository.ActivityRepositoryService';
  var Mock = {};
  var Injections = {};
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      mockDataSource();

      /* Test data */
      mockSelectedParticipant();
      mockActivities();

      /* Injectable mocks */
      mockActivityContextService(_$injector_);

      service = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('connectTo method', function() {

    it('should call dataSource.up', function() {
      service.connectTo(Mock.dataSource);

      expect(Mock.dataSource.up).toHaveBeenCalledWith();
    });

    describe('when dataSource.up is completed with success', function() {

      it('the action should be logged', function() {
        spyOn(console, 'debug');

        service.connectTo(Mock.dataSource);

        expect(console.debug).toHaveBeenCalled();
      });

    });

  });

  describe('add method', function() {

    describe('when exist activities to store', function() {

      it('should request selected participant', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

        service.connectTo(Mock.dataSource);
        service.add(Mock.activities);

        expect(Mock.ActivityContextService.getSelectedParticipant).toHaveBeenCalledWith();
      });

      it('should handle activity data set', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

        service.connectTo(Mock.dataSource);
        service.add(Mock.activities);

        expect(Mock.dataSource.getActivityDataSet).toHaveBeenCalledWith();
        expect(Mock.dataSet.getData).toHaveBeenCalledWith();
      });

      it('should insert activities into activity data set', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

        service.connectTo(Mock.dataSource);
        service.add(Mock.activities);

        expect(Mock.dataSource.getActivityDataSet).toHaveBeenCalledWith();
        expect(Mock.dataSetAPI.insert).toHaveBeenCalledWith(Mock.activitiesPostProcessing);
      });

      it('should save data set', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

        service.connectTo(Mock.dataSource);
        service.add(Mock.activities);

        expect(Mock.dataSet.save).toHaveBeenCalledWith();
      });

    });

    describe('when does not exist activities to store', function() {

      it('should not request selected participant', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

        service.connectTo(Mock.dataSource);
        service.add([]);

        expect(Mock.ActivityContextService.getSelectedParticipant).not.toHaveBeenCalledWith();
      });

      it('should not handle activity data set', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

        service.connectTo(Mock.dataSource);
        service.add([]);

        expect(Mock.dataSource.getActivityDataSet).not.toHaveBeenCalledWith();
        expect(Mock.dataSet.getData).not.toHaveBeenCalledWith();
      });

      it('should not insert activities into activity data set', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

        service.connectTo(Mock.dataSource);
        service.add([]);

        expect(Mock.dataSource.getActivityDataSet).not.toHaveBeenCalledWith();
        expect(Mock.dataSetAPI.insert).not.toHaveBeenCalledWith(Mock.activitiesPostProcessing);
      });

    });

  });

  describe('listAll method', function() {

    beforeEach(function() {
      Mock.dataSetAPI.where = jasmine.createSpy().and.callFake(function() {
        arguments[0]({ participantData: Mock.selectedParticipant });
      }).and.returnValue(Mock.activitiesPostProcessing);
    });

    it('should request selected participant', function() {
      spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

      service.connectTo(Mock.dataSource);
      service.listAll();

      expect(Mock.ActivityContextService.getSelectedParticipant).toHaveBeenCalledWith();
    });

    it('should handle activity data set', function() {
      spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

      service.connectTo(Mock.dataSource);
      service.listAll();

      expect(Mock.dataSource.getActivityDataSet).toHaveBeenCalledWith();
    });

    it('should get data from activity data set', function() {
      spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

      service.connectTo(Mock.dataSource);
      service.listAll();

      expect(Mock.dataSet.getData).toHaveBeenCalledWith();
    });

    describe('when filter by recruitment number is applied', function() {

      it('should return only activities of selected participant', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

        service.connectTo(Mock.dataSource);
        var result = service.listAll();

        expect(Mock.dataSetAPI.where).toHaveBeenCalledWith(jasmine.any(Function));
        expect(result.length).not.toBe(0);
      });

    });

    describe('when filter by recruitment number is applied', function() {

      beforeEach(function() {
        Mock.dataSetAPI.where = jasmine.createSpy().and.callFake(function() {
          arguments[0]({ participantData: Mock.selectedParticipant });
        }).and.returnValue([]);
      })

      it('should not return activities if selected participant has not activities', function() {
        spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.notSelectedParticipant);

        service.connectTo(Mock.dataSource);
        var result = service.listAll();

        expect(Mock.dataSetAPI.where).toHaveBeenCalledWith(jasmine.any(Function));
        expect(result.length).toBe(0);
      });

    });

  });

  describe('listAvailables method', function() {

    it('should find all activities of collection', function() {
      service.connectTo(Mock.dataSource);

      service.listAvailables();

      expect(Mock.dataSource.getSurveyDataSet).toHaveBeenCalledWith();
      expect(Mock.dataSet.getData).toHaveBeenCalledWith();
      expect(Mock.dataSetAPI.find).toHaveBeenCalledWith();
    });

  });

  describe('remove method', function() {

    it('should handle activity data set', function() {
      spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

      service.connectTo(Mock.dataSource);
      service.remove(Mock.activities);

      expect(Mock.dataSource.getActivityDataSet).toHaveBeenCalledWith();
    });

    it('should get data from activity data set', function() {
      spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

      service.connectTo(Mock.dataSource);
      service.remove(Mock.activities);

      expect(Mock.dataSet.getData).toHaveBeenCalledWith();
    });

    it('should remove activities from data set', function() {
      spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

      service.connectTo(Mock.dataSource);
      service.remove(Mock.activities);

      expect(Mock.dataSetAPI.remove).toHaveBeenCalled();
    });

    it('should save data set', function() {
      spyOn(Mock.ActivityContextService, 'getSelectedParticipant').and.returnValue(Mock.selectedParticipant);

      service.connectTo(Mock.dataSource);
      service.remove(Mock.activities);

      expect(Mock.dataSet.save).toHaveBeenCalledWith();
    });

  });

  function mockActivities() {
    Mock.activityA = {};
    Mock.activityA.acronym = 'AA';
    Mock.activityA.name = 'Activity A';
    Mock.activityA.surveyID = 'ID1';

    Mock.activityB = {};
    Mock.activityB.acronym = 'AB';
    Mock.activityB.name = 'Activity B';
    Mock.activityB.surveyID = 'ID2';

    Mock.activityC = {};
    Mock.activityC.acronym = 'AC';
    Mock.activityC.name = 'Activity C';
    Mock.activityC.surveyID = 'ID3';

    Mock.activities = [Mock.activityA, Mock.activityB, Mock.activityC];

    Mock.participantActivityA = {};
    Mock.participantActivityA.acronym = 'AA';
    Mock.participantActivityA.name = 'Activity A';
    Mock.participantActivityA.surveyID = 'ID1';
    Mock.participantActivityA.participantData = Mock.selectedParticipant;

    Mock.participantActivityB = {};
    Mock.participantActivityB.acronym = 'AB';
    Mock.participantActivityB.name = 'Activity B';
    Mock.participantActivityB.surveyID = 'ID2';
    Mock.participantActivityB.participantData = Mock.selectedParticipant;

    Mock.participantActivityC = {};
    Mock.participantActivityC.acronym = 'AC';
    Mock.participantActivityC.name = 'Activity C';
    Mock.participantActivityC.surveyID = 'ID3';
    Mock.participantActivityC.participantData = Mock.selectedParticipant;

    Mock.activitiesPostProcessing = [Mock.participantActivityA, Mock.participantActivityB, Mock.participantActivityC];
  }

  function mockSelectedParticipant() {
    Mock.selectedParticipant = {};
    Mock.selectedParticipant.name = 'Participant Name';
    Mock.selectedParticipant.recruitmentNumber = '123456';
    Mock.selectedParticipant.fieldCenter = 'RS';
  }

  function mockActivityContextService($injector) {
    Mock.ActivityContextService = $injector.get('otusjs.activity.core.ContextService');
    Injections.ActivityContextService = Mock.ActivityContextService;
  }

  function mockDataSource($injector) {
    var promise = {};
    promise.then = jasmine.createSpy().and.callFake(function() {
      arguments[0]();
    });

    Mock.dataSource = {};
    Mock.dataSource.up = jasmine.createSpy().and.returnValue(promise);

    Mock.dataSetAPI = {};
    Mock.dataSetAPI.insert = jasmine.createSpy();
    Mock.dataSetAPI.find = jasmine.createSpy();
    Mock.dataSetAPI.remove = jasmine.createSpy();

    Mock.dataSet = {};
    Mock.dataSet.getData = jasmine.createSpy().and.returnValue(Mock.dataSetAPI);
    Mock.dataSet.save = jasmine.createSpy();

    Mock.dataSource.getActivityDataSet = jasmine.createSpy().and.returnValue(Mock.dataSet);
    Mock.dataSource.getSurveyDataSet = jasmine.createSpy().and.returnValue(Mock.dataSet);

    Injections.dataSource = Mock.dataSource;
  }

});
