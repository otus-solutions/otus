fdescribe('otusDashboardPendency Test', function() {

  var UNIT_NAME = 'otusDashboardPendencyCtrl';
  var Injections = {};
  var controller = {};
  var DATA_RN = "9892854";
  var Mock = {};


  beforeEach(function() {
    mocks();

    angular.mock.module('otusjs.otus');

    inject(function($injector, $controller, $rootScope, $compile) {
      //Mock.scope = $rootScope.$new();
      //Mock.element = angular.element('<input>');
      //Mock.element = $compile(Mock.element)(Mock.scope);

      Injections.ParticipantActivityService = $injector.get('otusjs.activity.business.ParticipantActivityService');
      Injections.ApplicationStateService = $injector.get('otusjs.application.state.ApplicationStateService');
      Injections.ParticipantManagerService = $injector.get('otusjs.participant.business.ParticipantManagerService');
      Injections.UserActivityPendencyFactory = $injector.get('otusjs.model.pendency.UserActivityPendencyFactory');
      Injections.ActivityPlayerService = $injector.get('otusjs.activity.business.ActivityPlayerService');
      Injections.ActivityViewService = $injector.get('otusjs.activity.business.ActivityViewService');
      Injections.UserActivityPendencyService = $injector.get('otusjs.pendency.business.UserActivityPendencyService');
      Injections.$q = $injector.get('$q');
      Injections.$mdToast = $injector.get('$mdToast');
      //Injections.$element = Mock.element;

      controller = $controller(UNIT_NAME, Injections);

      Mock.deferred = Injections.$q.defer();

    });
  });

  it('should controller defined', function() {
    expect(controller).toBeDefined();
    expect(controller.loadActivities).toBeDefined();
    expect(controller.loadActivityPlayer).toBeDefined();
    expect(controller.loadActivityViewer).toBeDefined();
    expect(controller.selectParticipant).toBeDefined();
    expect(controller.displayGridLarge).toBeDefined();
    expect(controller.displayGridSmall).toBeDefined();
  });

  it('should call selectParticipant method', function () {
    spyOn(Injections.ParticipantManagerService,"getParticipant")
    spyOn(Injections.ParticipantManagerService,"selectParticipant")

    expect(controller.selectParticipant(DATA_RN)).toBePromise();

    expect(Injections.ParticipantManagerService.getParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantManagerService.selectParticipant).toHaveBeenCalledTimes(1);
  });

  xit('should call loadActivities method', function (done) {
    spyOn(Injections.ParticipantManagerService,"getParticipant").and.returnValue(Promise.resolve());
    spyOn(Injections.ParticipantManagerService,"selectParticipant");
    spyOn(Injections.ApplicationStateService,"activateParticipantActivities");
    spyOn(controller,"selectParticipant").and.returnValue(Promise.resolve());

    controller.loadActivities(DATA_RN)

    controller.selectParticipant(DATA_RN).then(function () {
    expect(Injections.ParticipantManagerService.getParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantManagerService.selectParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledTimes(1);
    done();
  })
  .then(function () {
  expect(Injections.ApplicationStateService.activateParticipantActivities).toHaveBeenCalledTimes(0);
  done();
  })
  done();
  });

  it('should call displayGridLarge method', function () {
    window.innerWidth = 1300;
    expect(controller.displayGridLarge()).toEqual('1:0.75');
    window.innerWidth = 1900;
    expect(controller.displayGridLarge()).toEqual('1:0.5');
  });

  it('should call displayGridSmall method', function () {
    window.innerWidth = 600;
    expect(controller.displayGridSmall()).toEqual('1:1.3');
    window.innerWidth = 800;
    expect(controller.displayGridSmall()).toEqual('1:1');
  });


  function mocks() {
    Mock.group = ["Desfechos","Laboratório","Clínica"];
    Mock.surveysGroups = {
      getGroupSurveys: function () {
        return [Mock.survey];
      },
      getGroupNames: function () {
        return jasmine.createSpy()
      }
    };
    Mock.survey = Test.utils.data.activityPASC.surveyForm;
    Mock.survey.isRequiredExternalID = function(){
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
