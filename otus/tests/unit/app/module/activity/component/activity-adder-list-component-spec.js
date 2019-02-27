describe('otusActivityAdderList', function() {

  var UNIT_NAME = 'otusActivityAdderListCtrl';
  var Mock = {};
  var Bindings = {};
  var Injections = {};
  var controller = {};

  beforeEach(function() {
    mockInjections();
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value('otusjs.activity.business.ParticipantActivityService', Mock.ParticipantActivityService);
      $provide.value('otusjs.survey.GroupManagerFactory', {});
      $provide.value('otusjs.activity.business.GroupActivityService', Mock.GroupActivityService);
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('$scope', {$watch:()=>{},$$postDigest:()=>{}});
      $provide.value('$element', {find: ()=>{return {on: ()=>{}}}});
    });

    inject(function(_$injector_, _$controller_) {
      /* Injectable mocks */

      Mock.DynamicTableSettingsFactory = _$injector_.get('otusjs.otus.uxComponent.DynamicTableSettingsFactory');
      Injections.DynamicTableSettingsFactory = Mock.DynamicTableSettingsFactory;

      controller = _$controller_(UNIT_NAME, Injections);
      controller.otusActivityManager = {};
      controller.updateDataTable = function(){};
    });
  });

  describe('properties and methods', function () {
    it('should be defined', function () {
      expect(controller.searchTerm).toBeDefined();
      expect(controller.selectedGroups).toBeDefined();
      expect(controller.existsGroup).toBeDefined();
      expect(controller.isIndeterminateGroups).toBeDefined();
      expect(controller.isCheckedGroup).toBeDefined();
      expect(controller.toggleAllGroups).toBeDefined();
      expect(controller.clearSearchTerm).toBeDefined();
    });
  });

  describe("groups(bloc) tests", function () {
    beforeEach(function () {
      controller.selectedGroups = [];
      controller.surveysGroups = [
        {
          "_id": "5c7400d2d767afded0d84dcf",
          "objectType": "SurveyGroup",
          "name": "CI",
          "surveyAcronyms": [
            "ACTA",
            "AMAC",
            "CISE"
          ]
        },
        {
          "_id": "5c7400d2d767afded0d84dcf",
          "objectType": "SurveyGroup",
          "name": "CD",
          "surveyAcronyms": [
            "BIOC",
            "AMAC",
            "CFUC"
          ]
        }
      ];
      controller.groupList = ["CI","CD"];
      controller.AllActivities = Mock.AllActivities;
      controller.searchTerm = "CD";
      spyOn(controller, "updateDataTable").and.callThrough();
    });
    it('should filter by group', function () {
      controller.$onInit();
      expect(controller.existsGroup("CI")).toBeFalsy();
      expect(controller.isCheckedGroup()).toBeFalsy();
      expect(controller.isIndeterminateGroups()).toBeFalsy();

      controller.toggleAllGroups();
      expect(controller.updateDataTable).toHaveBeenCalledTimes(1);
      expect(controller.isIndeterminateGroups()).toBeFalsy();

      expect(controller.existsGroup("CI")).toBeTruthy();
      expect(controller.isCheckedGroup()).toBeTruthy();
      controller.toggleAllGroups();
      controller.toggleAllGroups();
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
    Mock.ParticipantActivityService = {
      listAvailables: function () {
        return Promise.resolve(Test.utils.data.activity[0].activities);
      },
      selectActivities: function(){}
    };

    Mock.GroupActivityService = {
      listSurveysGroups: function () {
        return Promise.resolve([
          {
            "_id": "5c7400d2d767afded0d84dcf",
            "objectType": "SurveyGroup",
            "name": "CI",
            "surveyAcronyms": [
              "ACTA",
              "AMAC",
              "CISE"
            ]
          },
          {
            "_id": "5c7400d2d767afded0d84dcf",
            "objectType": "SurveyGroup",
            "name": "CD",
            "surveyAcronyms": [
              "BIOC",
              "AMAC",
              "CFUC"
            ]
          }
        ]);
      }
    };

    Mock.LoadingScreenService = {
      start: () =>{},
      finish: () =>{}
    };

    Mock.AllActivities = [
      {surveyTemplate: {
          identity: {acronym: "ACTA"}
        }
      },
      {surveyTemplate: {
          identity: {acronym: "CISE"}
        }
      },
      {surveyTemplate: {
          identity: {acronym: "MEDC"}
        }
      },
    ]

  }

});
