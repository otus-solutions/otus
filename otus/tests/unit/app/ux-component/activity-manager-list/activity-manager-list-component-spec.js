describe('otusActivityManagerList Test', function() {

  var UNIT_NAME = 'otusActivityListCtrl';
  var Mock = {};
  var Injections = {};
  var controller = {};
  var originalTimeout;
  var HEADERS_NAMES;
  var FLEX_ARRAY;
  var ELEMENTS_ARRAY;


  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    mockInjections();
    angular.mock.module('otusjs.otus.uxComponent', function($provide){
      $provide.value('otusActivityManager', {});
      $provide.value('otusjs.activity.business.ParticipantActivityService', Mock.ParticipantActivityService);
      $provide.value('otusjs.activity.business.GroupActivityService', Mock.GroupActivityService);
      $provide.value('otusjs.activity.core.EventService', Mock.EventService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('$q', {});
      $provide.value('$scope', {$watch:()=>{},$$postDigest:()=>{}});
      $provide.value('$element', {find: ()=>{return {on: ()=>{}}}});
    });

    inject(function(_$injector_, _$controller_) {
      Injections = {
        "ActivityItemFactory" : _$injector_.get('otusjs.otus.uxComponent.ActivityItemFactory'),
        "DynamicTableSettingsFactory" : _$injector_.get('otusjs.otus.uxComponent.DynamicTableSettingsFactory')
      };

      controller = _$controller_(UNIT_NAME, Injections);
      controller.otusActivityManager = {};
      controller.updateDataTable = function(){};
      spyOn(Injections.ActivityItemFactory, "create").and.callFake(function (activity) {
        return activity;
      });
    });
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  describe("controller initialize tests", function () {
    beforeEach(function () {
      spyOn(Mock.ParticipantActivityService, "listAll").and.callThrough();
      spyOn(Mock.GroupActivityService, "getSurveyGroupsByUser").and.callThrough();
    });
    it('should verify properties definition', function () {
      expect(controller.existsGroup).toBeDefined();
      expect(controller.isIndeterminateGroups).toBeDefined();
      expect(controller.isCheckedGroup).toBeDefined();
      expect(controller.toggleAllGroups).toBeDefined();
      expect(controller.clearSearchTerm).toBeDefined();
      expect(controller.selectedGroups).toBeDefined();
      expect(controller.selectedSurveys).toBeDefined();
      controller.$onInit();
      expect(Mock.ParticipantActivityService.listAll).toHaveBeenCalledTimes(1);
      expect(Mock.GroupActivityService.getSurveyGroupsByUser).toHaveBeenCalledTimes(1);
      Mock.GroupActivityService.getSurveyGroupsByUser().then(function () {
        expect(controller.surveysGroups).toBeDefined();
      })

    });
  });

  describe('dynamic table tests', function () {
    it('should create dynamic table settings', function(done){
      expect(controller).toBeDefined();
      expect(controller.dynamicTableSettings).toBeUndefined();
      controller.$onInit();
      expect(controller.dynamicTableSettings).toBeDefined();
      Mock.ParticipantActivityService.listAll().then(function (activities) {
        done();
      });
      expect(controller.dynamicTableSettings.headers).toEqual(HEADERS_NAMES);
      expect(controller.dynamicTableSettings.flexArray).toEqual(FLEX_ARRAY);
      expect(controller.dynamicTableSettings.elementsProperties[0]).toEqual(ELEMENTS_ARRAY[0]);
      expect(controller.dynamicTableSettings.elementsProperties[1]).toEqual(ELEMENTS_ARRAY[1]);
      expect(typeof controller.dynamicTableSettings.elementsProperties[2].iconWithFunction.iconFunction)
        .toEqual(typeof ELEMENTS_ARRAY[2].iconWithFunction.iconFunction);
      expect(controller.dynamicTableSettings.elementsProperties[3]).toEqual(ELEMENTS_ARRAY[3]);
      expect(controller.dynamicTableSettings.elementsProperties[4]).toEqual(ELEMENTS_ARRAY[4]);
      expect(controller.dynamicTableSettings.elementsProperties[5]).toEqual(ELEMENTS_ARRAY[5]);
    });

  });

  describe("groups(bloc) tests", function () {
    beforeEach(function () {
      controller.selectedGroups = [];
      controller.surveysGroups = Mock.groupManager;
      controller.groupList = Mock.groupManager.getGroupNames();
      controller.AllActivities = Mock.AllActivities;
      controller.searchTerm = "CD";
      spyOn(controller, "updateDataTable").and.callThrough();
      spyOn(Mock.groupManager, "getGroupNames").and.callThrough();
      spyOn(Mock.groupManager, "getGroupSurveys").and.callThrough();
    });
    it('should filter by group', function () {
      controller.$onInit();
      controller.groupList = Mock.groupManager.getGroupNames();
      Mock.GroupActivityService.getSurveyGroupsByUser().then(function (response) {
        expect(Mock.groupManager.getGroupNames).toHaveBeenCalled();
      });

      expect(controller.existsGroup("CI")).toBeFalsy();
      expect(controller.isCheckedGroup()).toBeFalsy();
      expect(controller.isIndeterminateGroups()).toBeFalsy();

      controller.toggleAllGroups();
      expect(Mock.groupManager.getGroupSurveys).toHaveBeenCalledTimes(Mock.groupManager.getGroupNames().length);
      expect(controller.updateDataTable).toHaveBeenCalledTimes(1);
      expect(controller.isIndeterminateGroups()).toBeFalsy();

      expect(controller.existsGroup("CI")).toBeTruthy();
      expect(controller.isCheckedGroup()).toBeTruthy();
      controller.selectedGroups.pop();
      expect(controller.isIndeterminateGroups()).toBeTruthy();
    });

    it('should clear term to find group', function () {
      expect(controller.searchTerm).toEqual("CD");
      controller.clearSearchTerm();
      expect(controller.searchTerm).toEqual("");
    });
  });

  function mockInjections() {
    HEADERS_NAMES = ['NOME', 'ACRÔNIMO', 'MODO', 'REALIZAÇÃO', 'STATUS', 'CATEGORIA'];
    FLEX_ARRAY = ['25', '15', '10', '15', '20', '15'];
    ELEMENTS_ARRAY = ['name', 'acronym', {"iconWithFunction": {"iconFunction":  (element) => {
          var structureIcon = { icon: "md-svg-icon", class: "", tooltip: "" };
          var OnLineStructure = {
            icon: "equalizer",
            class: "activity-item-icon md-avatar-icon",
            tooltip: "On line",
          };
          var paperStructure = {
            icon: 'description',
            class: "activity-item-icon md-avatar-icon",
            tooltip: "Em papel",
          };

          if(element.mode.name === "Em papel"){
            structureIcon = paperStructure;
          } else {
            structureIcon = OnLineStructure;
          }
          return structureIcon;
        }}}, 'realizationDate', 'status', 'category'];

    Mock.LoadingScreenService = {
      start: function(){},
      finish: function(){}
    };


    Mock.EventService = {
      onParticipantSelected: function () {}
    };

    Mock.ParticipantActivityService = {
      listAll: function () {
        return Promise.resolve(Test.utils.data.activity[0].activities);
      },
      selectActivities: function(){}
    };

    Mock.AllActivities = [
      {acronym: "ACTA"},
      {acronym: "CISE"},
      {acronym: "MEDC"},
    ];

    Mock.groupManager = {
      getGroupNames: ()=>{
        return ["CI", "CD"];
      },
      getGroupSurveys: (name) =>{
        return ["ACTA", "AMAC", "CISE"];
      }
    };

    Mock.GroupActivityService = {
      getSurveyGroupsByUser: function () {
        return Promise.resolve(Mock.groupManager);
      }
    }


  }

});
