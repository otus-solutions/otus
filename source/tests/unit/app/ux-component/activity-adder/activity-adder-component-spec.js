describe('otusActivityAdder_UnitTest_Suite', function () {

  var Injections = {};
  var controller = {};
  var Mock = {};

  beforeEach(function () {
    _mockInitialize();

    angular.mock.module('otusjs.otus');

    inject(function ($injector, $controller, $rootScope, $compile) {
      Mock.scope = $rootScope.$new();
      Mock.element = angular.element('<input>');
      Mock.element = $compile(Mock.element)(Mock.scope);

      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.GroupActivityService = $injector.get('otusjs.activity.business.GroupActivityService');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.$q = $injector.get('$q');
      Injections.$timeout = $injector.get('$timeout');
      Injections.$element = Mock.element;

      controller = $controller('otusActivityAdderCtrl', Injections);

      Mock.deferred = Injections.$q.defer();
    });
  });

  it('should controller defined', function () {
    expect(controller).toBeDefined();
    expect(controller.$onInit).toBeDefined();
    expect(controller.addPreActivities).toBeDefined();
    expect(controller.saveActivities).toBeDefined();
    expect(controller.surveyQuerySearch).toBeDefined();
    expect(controller.resetPreActivities).toBeDefined();
    expect(controller.clearSearchTerm).toBeDefined();
    expect(controller.addPreActivitiesGroup).toBeDefined();
    expect(controller.disabledGroups).toBeDefined();
    expect(controller.displayGridLarge).toBeDefined();
    expect(controller.displayGridSmall).toBeDefined();
    expect(controller.monitoringSearchTextChange).toBeDefined();
    expect(controller.selectedItemChange).toBeDefined();
  });

  it('addPreActivities_method_should_call_ParticipantActivityService_addPreActivities_method', function () {
    spyOn(Injections.ParticipantActivityService, "createPreActivity").and.returnValue(Mock.preActivity);
    controller.addPreActivities(Mock.survey);
    expect(Injections.ParticipantActivityService.createPreActivity).toHaveBeenCalledTimes(1);
    expect(controller.preActivities).toEqual([Mock.preActivity]);
    expect(controller.searchText).toEqual('');
    expect(controller.btnAddPreActivitiesDisable).toBeTruthy();
  });

  it('saveActivities_method_should_call_ParticipantActivityService_saveActivities_method', function (done) {
    spyOn(Injections.DialogShowService, "showConfirmationDialog").and.returnValue(Promise.resolve());
    spyOn(Injections.ParticipantActivityService, "saveActivities").and.callThrough();

    controller.preActivities.push(Mock.preActivity);
    controller.saveActivities();

    expect(controller.preActivities[0].preActivityValid).toBeTruthy();
    Injections.DialogShowService.showConfirmationDialog().then(function () {
      expect(Injections.ParticipantActivityService.saveActivities).toHaveBeenCalledTimes(1);
      done();
    });
    done();
  });

  it('saveActivities_method_should_NOT_call_ParticipantActivityService_saveActivities_method', function (done) {
    spyOn(Injections.DialogShowService, "showWarningDialog").and.returnValue(Promise.resolve());
    spyOn(controller.preActivities, "every").and.returnValue(false);

    controller.saveActivities();

    Injections.DialogShowService.showWarningDialog().then(function () {
      expect(Injections.ParticipantActivityService.saveActivities).toHaveBeenCalledTimes(0);
      done();
    });
    done();
  });

  it('should call surveyQuerySearch method', function () {
    const ACRONYM = 'PASC';
    controller.surveysGroups = Mock.surveysGroups;
    controller.selectedGroupsResult = Mock.ITEM;
    expect(controller.surveyQuerySearch(ACRONYM)).toBePromise();
  });

  it('resetPreActivities_method_should_clear_preActivities_array', function (done) {
    spyOn(Injections.ApplicationStateService, "activateParticipantActivities").and.callThrough();
    spyOn(Injections.DialogShowService, "showConfirmationDialog").and.returnValue(Mock.deferred.promise);
    controller.resetPreActivities();

    Injections.DialogShowService.showConfirmationDialog().then(function () {
      expect(Injections.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledTimes(0);
      done();
    });
    done();
  });

  it('clearSearchTerm_method', function () {
    controller.clearSearchTerm();
    expect(controller.searchTerm).toEqual("");
  });

  it('should call addPreActivitiesGroup method', function () {
    controller.surveysGroups = Mock.surveysGroups;
    controller.groupList = Mock.group;
    controller.surveys.push(Mock.survey);
    controller.addPreActivitiesGroup(Mock.ITEM);

    expect(controller.selectedGroupsResult).toEqual(Mock.group);
    expect(controller.processing).toBeFalsy();
  });

  it('should call disabledGroups method', function () {
    controller.selectedGroups = [];
    expect(controller.disabledGroups()).toBeFalsy();
    controller.selectedGroups = Mock.ITEM;
    expect(controller.disabledGroups(1)).toBeTruthy();
    controller.selectedGroups = Mock.group;
    expect(controller.disabledGroups(0)).toBeTruthy();
    controller.searchTerm = Mock.group[0];
    expect(controller.disabledGroups(0)).toBeFalsy();
  });

  it('should call displayGridLarge method', function () {
    window.innerWidth = 1300;
    expect(controller.displayGridLarge()).toEqual('1:1.6');
    window.innerWidth = 1900;
    expect(controller.displayGridLarge()).toEqual('1:1.4');
  });

  it('should call displayGridSmall method', function () {
    window.innerWidth = 600;
    expect(controller.displayGridSmall()).toEqual('1:1.7');
    window.innerWidth = 800;
    expect(controller.displayGridSmall()).toEqual('3:4');
  });

  it('should call monitoringSearchTextChange method', function () {
    controller.monitoringSearchTextChange(true);
    expect(controller.addStateValid).toBeTruthy();
  });

  it('should call selectedItemChange method', function () {
    controller.selectedItemChange(Mock.survey);

    expect(controller.btnAddPreActivitiesDisable).toBeFalsy();
  });

  it('should call onInit method', function () {
    spyOn(Injections.LoadingScreenService, "start").and.callThrough();
    spyOn(Injections.ParticipantActivityService, "listAllCategories").and.callThrough();
    spyOn(Injections.ParticipantActivityService, "listAvailables").and.callThrough();
    spyOn(Injections.LoadingScreenService, "finish").and.callThrough();
    spyOn(Injections.GroupActivityService, "getSurveyGroupsByUser").and.returnValue(Mock.deferred.promise);

    controller.$onInit();

    expect(Injections.LoadingScreenService.start).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantActivityService.listAllCategories).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantActivityService.listAvailables).toHaveBeenCalledTimes(1);
    expect(Injections.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
    expect(Injections.GroupActivityService.getSurveyGroupsByUser).toHaveBeenCalledTimes(1);
    Mock.deferred.resolve(Mock.surveysGroups);
    Mock.scope.$digest();

  });

  function _mockInitialize() {
    Mock.ITEM = ['Todos'];
    Mock.group = ["Desfechos", "Laboratório", "Clínica"];
    Mock.surveysGroups = {
      getGroupSurveys: function () {
        return [Mock.survey];
      },
      getGroupNames: function () {
        return jasmine.createSpy()
      }
    };
    Mock.survey = Test.utils.data.activityPASC.surveyForm;
    Mock.survey.isRequiredExternalID = function () {
      return false;
    };
    Mock.mode = Test.utils.data.activityPASC.mode;
    Mock.configuration = {
      category: {
        disabled: false,
        isDefault: true,
        label: "Normal",
        name: "C0",
        objectType: "ActivityCategory"
      }
    };
    Mock.participant = Test.utils.data.activityPASC.participantData;
    Mock.configuration = {
      category: {
        disabled: false,
        isDefault: true,
        label: "Normal",
        name: "C0",
        objectType: "ActivityCategory"
      }
    };
    Mock.externalID = "32432432";
    Mock.user = {
      email: "fulano@gmail.com",
      fieldCenter: {},
      name: "Adonis",
      phone: "5199999999",
      surname: "Garcia",
      token: "eyJhbGciOiJIUzI1NiJ9AOFIMALEM"
    };
    Mock.preActivity = {
      configuration: Mock.configuration,
      externalID: Mock.externalID,
      mode: Mock.mode,
      objectType: "preActivity",
      paperActivityData: "",
      preActivityValid: false,
      surveyForm: Mock.survey,
      user: Mock.user
    };
  }

});
