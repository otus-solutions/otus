describe('activity-import-component Test', function () {
  var Mock = {};
  var controller;
  var Injections = {};
  var scope;

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusjs.otus.uxComponent', function ($provide) {
      $provide.value("otusjs.model.activity.ActivityImportService", {});
    });
    angular.mock.module('otusjs.activity', function ($provide) {
      $provide.value('otusjs.deploy.SurveyRestService', {});
      $provide.value('otusjs.deploy.SurveyGroupRestService', {});
    });

    spyOn(window, "FileReader");

    inject(function (_$injector_, _$controller_, $rootScope) {
      scope = $rootScope.$new();
      Injections = {
        ActivityService: _$injector_.get('otusjs.activity.business.ParticipantActivityService'),
        ActivityImportService: _$injector_.get('otusjs.model.activity.ActivityImportService'),
        $scope: scope,
        $mdToast: _$injector_.get('$mdToast'),
        ImportService: _$injector_.get('otusjs.activity.business.ActivityImportService'),
      };

      controller = _$controller_('otusActivityImportCtrl', Injections);
      controller.user = {
        token: "asdasdf"
      }
      spyOn(document, "querySelector").and.returnValue({click: function(){}});
      spyOn($.fn, "querySelector").and.returnValue({click: function(){}});
    });
  });

  it('should define controller', function () {
    expect(controller).toBeDefined();
    expect(controller.$onInit).toBeDefined();
    expect(controller.upload).toBeDefined();
    expect(controller.validateAnswers).toBeDefined();
    expect(controller.saveActivitiesAnswered).toBeDefined();
    expect(controller.cancel).toBeDefined();
    expect(controller.getTotal).toBeDefined();
    expect(controller.ActivitiesInvalids).toBeDefined();
    expect(controller.countActivities).toBeDefined();
    expect(controller.countActivitiesValids).toBeDefined();
    expect(controller.countActivitiesError).toBeDefined();
    expect(controller.isLoading).toBeDefined();
    expect(controller.ActivitiesAnswered).toBeDefined();
    expect(controller.user).toBeDefined();
  });

  it('should onInit component', function () {
    controller.$onInit();
    expect(controller.receivedJSON).toBeDefined();
    expect(controller.input).toBeDefined();
    spyOn(controller.input, "click");
    expect(controller.input.click).toHaveBeenCalled();
    controller.upload()
    console.log(controller.input)
  });


  function mockInjections() {
    // Mock.$element = [{
    //   querySelector: function(){
    //     return {
    //       on: function () {},
    //       click: function () {},
    //       val: function () {}
    //     }
    //   }
    // }]
  }


});
