describe('activity-import-component Test', function () {
  var Mock = {};
  var controller;
  var Injections = {};
  var scope, originalTimeout;
  var eventListener;

  beforeEach(function () {
    mockInjections();
    mockData();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    angular.mock.module('otusjs.otus');

    spyOn(window, "FileReader").and.returnValue({
      addEventListener: eventListener,
      readAsDataURL: function (file) {
      }
    });

    inject(function (_$injector_, _$controller_, $rootScope, _$interval_) {
      scope = $rootScope.$new();
      Injections = {
        ActivityService: _$injector_.get('otusjs.activity.business.ParticipantActivityService'),
        ActivityImportService: _$injector_.get('otusjs.model.activity.ActivityImportService'),
        $scope: scope,
        $mdToast: _$injector_.get('$mdToast'),
        ImportService: _$injector_.get('otusjs.activity.business.ActivityImportService'),
        DialogShowService: _$injector_.get('otusjs.application.dialog.DialogShowService'),
        $interval: _$interval_,
        $mdToast: _$injector_.get('$mdToast')
      };
      controller = _$controller_('otusActivityImportCtrl', Injections);
      controller.user = { token: "asdasdf" };


      spyOn($.fn, "init").and.returnValue({
        click: function () {
        }, on: function () {
        }
      });
      spyOn(Injections.ActivityService, "listAvailables").and.returnValue(Promise.resolve([Test.utils.data.activityPASC.surveyForm]))
      spyOn(scope, "$apply");
    });
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });


  it('should define controller', function () {
    expect(controller).toBeDefined();
    expect(controller.$onInit).toBeDefined();
    expect(controller.upload).toBeDefined();
    expect(controller.validateAnswers).toBeDefined();
    expect(controller.saveActivitiesAnswered).toBeDefined();
    expect(controller.cancel).toBeDefined();
    expect(controller.getTotal).toBeDefined();
    expect(controller.showDialog).toBeDefined();
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
    expect(controller.input.on).toBeDefined();
    expect(controller.input.click).toBeDefined();
    expect(controller.receivedJSON).toBeDefined();
    expect(controller.input).toBeDefined();
  });

  it('should input file clicked', function () {
    controller.$onInit();
    spyOn(controller.input, "click");
    controller.upload();
    expect(controller.input.click).toHaveBeenCalledTimes(1);
  });

  it('should return total in activities valids and invalids', function () {
    controller.countActivitiesValids = 5;
    controller.countActivitiesError = 5;
    expect(controller.getTotal()).toEqual(10);
  });

  it('should call DialogService', function () {
    spyOn(Injections.DialogShowService, "showDialog");
    controller.showDialog(Mock.item);
    expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
  });

  it('should upload file', function (done) {
    controller.$onInit();
    controller.upload();
    controller.activities = [Test.utils.data.activityPASC.surveyForm];
    var fr = new FileReader();
    fr.onload(Mock.e);
    expect(controller.selectedActivity).toEqual(Test.utils.data.activityPASC.surveyForm);
    expect(controller.receivedJSON.length).toEqual(1);
    expect(controller.receivedJSON).toEqual(JSON.parse(Mock.e.target.result));
    expect(scope.$apply).not.toHaveBeenCalledTimes(2);
    expect(scope.$apply).toHaveBeenCalledTimes(1);
    done();
  });

  it('should upload file invalid', function (done) {
    spyOn(Injections.$mdToast, "show").and.callThrough();
    spyOn(Injections.$mdToast, "simple").and.callThrough();
    controller.$onInit();
    controller.upload();
    var survey = angular.copy(Test.utils.data.activityPASC.surveyForm);
    survey.surveyTemplate.identity.acronym = "PAS";
    controller.activities = [survey];
    var fr = new FileReader();
    fr.onload(Mock.e);
    expect(controller.selectedActivity).toBeUndefined();
    expect(controller.receivedJSON.length).toEqual(1);
    expect(controller.receivedJSON).toEqual(JSON.parse(Mock.e.target.result));
    expect(scope.$apply).not.toHaveBeenCalledTimes(2);
    expect(scope.$apply).toHaveBeenCalledTimes(1);
    expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1);
    expect(Injections.$mdToast.simple).toHaveBeenCalledTimes(1);
    done();
  });

  xit('should validate file valid', function () {
    controller.$onInit();
    spyOn(Injections.ActivityImportService, "create").and.returnValue(Mock.valid);
    controller.activities = [Test.utils.data.activityPASC.surveyForm];
    var fr = new FileReader();
    fr.onload(Mock.e);
    controller.validateAnswers();
    // Injections.$interval.flush(100);
    scope.$apply();
    expect(controller.total).toEqual(1);
    expect(controller.countActivitiesValids).toEqual(1);
    expect(controller.ActivitiesAnswered).toEqual([Mock.valid]);
    expect(controller.ActivitiesInvalids).toEqual([]);
    expect(controller.countActivitiesError).toEqual(0);
  });

  xit('should save activities valids', function (done) {
    spyOn(Injections.ImportService, "importActivities").and.returnValue(Promise.resolve(Mock.response));
    spyOn(Injections.ImportService, "getActivityError").and.returnValue(Mock.activityError);
    spyOn(controller, "saveActivitiesAnswered").and.callThrough();
    controller.$onInit();
    spyOn(Injections.ActivityImportService, "create").and.returnValue(Mock.valid);
    controller.activities = [Test.utils.data.activityPASC.surveyForm];
    var fr = new FileReader();
    fr.onload(Mock.e);
    controller.validateAnswers();
    Injections.$interval.flush(100);
    scope.$apply();
    controller.saveActivitiesAnswered();
    expect(controller.countActivitiesError).toEqual(0);
    expect(controller.countActivitiesValids).toEqual(1);
    expect(Injections.ImportService.importActivities).toHaveBeenCalledTimes(1);
    Injections.ImportService.importActivities().then(function () {
      expect(controller.ActivitiesInvalids[0]).toEqual(Mock.activityError);
      expect(controller.countActivitiesError).toEqual(1);
      expect(controller.countActivitiesValids).toEqual(0);
      expect(controller.saveActivitiesAnswered).toHaveBeenCalledTimes(2);
      done();
    });
    done();
  });

  it('should download report errors', function () {
    spyOn(window, "alasql");
    controller.ActivitiesInvalids = [Mock.activityError];
    controller.downloadCSV()
    expect(window.alasql).toHaveBeenCalledTimes(1)
  });


  it('should\'nt  download report errors', function () {
    spyOn(window, "alasql");
    controller.downloadCSV()
    expect(window.alasql).toHaveBeenCalledTimes(0)
  });

  function mockInjections() {
    Mock.activityError = {
      rn: 123456,
      acronym: 'PASC',
      name: 'PRESSÃO ARTERIAL',
      error: 'Número de recrutamento inválido! Categoria {C1} inválida! Usuário {email} inválido! Aferidor {email} inválido! Questão {QUESTIONID} deveria estar preenchida! ',
      category: 'C1',
      isValid: false
    };
    Mock.ActivityImportService = {
      create: function () {
        return {}
      }
    };
    Mock.LoadingScreenService = {
      start: function () {
        return Promise.resolve();
      },
      finish: function () {
        return Promise.resolve();
      }
    };
  }

  function mockData() {
    Mock.error = {
      rn: '',
      acronym: 'PASC',
      name: 'PRESSÃO ARTERIAL',
      error: 'Respostas inválidas!',
      category: '',
      isValid: false
    };
    Mock.dataActivity = { participantData: '', acronym: '', name: '', error: '', category: { label: '' }, isValid: false };

    Mock.valid = {
      isValid: true,
      error: ''
    };

    Mock.TYPE = "application/json";
    Mock.item = {
      rn: 1234567,
      acronym: "PASC",
      name: "Pressão Arterial",
      category: "Normal",
      error: "Error"
    };

    Mock.response = [
      {
        recruitmentNumberValidationResult: {
          recruitmentNumber: 123456,
          isValid: false
        },
        categoryValidationResult: {
          category: "C1",
          isValid: false
        },
        interviewerValidationResult: {
          email: "email",
          isValid: false
        },
        paperInterviewerValidationResult: {
          email: "email",
          isValid: false
        },
        questionFillValidationResult: {
          questionId: "PASC1",
          shouldBeFilled: true
        }
      }
    ];

    Mock.e = {
      target: {
        result: `[{
        "id": "",
        "acronym": "PASC",
        "participant": "7012444",
        "user": {
          "name": "otus",
          "surname": "solutions",
          "phone": 654897566,
          "email": "user@gmail.com"
        },
        "status": "FINALIZED",
        "mode": "PAPER",
        "activityConfiguration": {
          "category": {
            "name": "C0",
            "objectType": "ActivityCategory",
            "label": "Normal",
            "disabled": false,
            "isDefault": true
          }
        },
        "answers": {
          "PASC3brs": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC1": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC3mets": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC1m": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC3a": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC4a": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC5a": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC3b": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC4b": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC5b": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC3c": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC4c": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASC5c": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          },
          "PASCalt": {
            "value": "answer",
            "metadada": "",
            "comment": ""
          }
        },
        "offlineData": {
          "checker": "other@email.com",
          "realizationDate": "2017-04-17T12:06:34.660Z"
        }
      }]`
      }
    }
  }

});
