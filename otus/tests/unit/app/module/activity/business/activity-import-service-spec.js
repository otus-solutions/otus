describe('activity-import-service Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  Mock.surveyActivities = [{}, {}];
  Mock.version = 1;

  beforeEach(function () {
    mockData();
    angular.mock.module('otusjs.activity', function ($provide) {
      $provide.value('otusjs.deploy.SurveyRestService', {});
      $provide.value('otusjs.deploy.SurveyGroupRestService', {});
    });

    inject(function (_$injector_) {
      Injections = {
        ActivityRepositoryService: _$injector_.get('otusjs.activity.repository.ActivityRepositoryService')
      };
      service = _$injector_.get('otusjs.activity.business.ActivityImportService', Injections);
    });

    spyOn(Injections.ActivityRepositoryService, "importActivities");
  });

  it('should define service', function () {
    expect(service).toBeDefined()
    expect(service.importActivities).toBeDefined();
    expect(service.getAnsweredActivityError).toBeDefined();
    expect(service.getActivityError).toBeDefined();
  });

  it('should call importActivities method', function () {
    service.importActivities(Mock.surveyActivities, Mock.version);
    expect(Injections.ActivityRepositoryService.importActivities).toHaveBeenCalledTimes(1);
    expect(Injections.ActivityRepositoryService.importActivities).toHaveBeenCalledWith(Mock.surveyActivities, Mock.version)
  });

  it('should return answered activity error', function () {
    expect(service.getAnsweredActivityError(Mock.activity, Mock.acronym, Mock.name)).toEqual(Mock.activityStructure);
    expect(service.getAnsweredActivityError()).toEqual(Mock.activityStructureEmpty)
  });

  it('should return activity error 1', function () {
    expect(service.getActivityError(Mock.response, Mock.activity)).toEqual(Mock.activityError1);
  });

  it('should return activity error 2', function () {
    Mock.response.questionFillValidationResult.shouldBeFilled = false;
    expect(service.getActivityError(Mock.response, Mock.activity)).toEqual(Mock.activityError2);
  });

  it('should return activity error 3', function () {
    Mock.response.categoryValidationResult.isValid = true;
    expect(service.getActivityError(Mock.response, Mock.activity)).toEqual(Mock.activityError3);
  });

  it('should return activity error 4', function () {
    Mock.response.recruitmentNumberValidationResult.isValid = true;
    expect(service.getActivityError(Mock.response, Mock.activity)).toEqual(Mock.activityError4);
  });

  it('should return activity error 5', function () {
    Mock.response.interviewerValidationResult.isValid = true;
    expect(service.getActivityError(Mock.response, Mock.activity)).toEqual(Mock.activityError5);
  });

  it('should return activity error 6', function () {
    delete Mock.response.paperInterviewerValidationResult;
    expect(service.getActivityError(Mock.response, Mock.activity)).toEqual(Mock.activityError6);
  });

  it('should return activity error 7', function () {
    delete Mock.response.questionFillValidationResult;
    expect(service.getActivityError(Mock.response, Mock.activity)).toEqual(Mock.activityError7);
  });

  function mockData() {
    Mock.activity = {
      participantData: 1234567,
      error: "",
      category: {
        label: "Normal"
      },
      isValid: false,
      surveyTemplate: {
        identity: {
          acronym: "PASC",
          name: "Pressão Arterial"
        },
        getItemByTemplateID: function () {
          return {
            customID: "QUESTIONID"
          }
        }
      }
    };

    Mock.acronym = "PASC";
    Mock.name = "Pressão Arterial";

    Mock.activityStructureEmpty = {
      rn: '',
      acronym: '',
      name: '',
      error: '',
      category: '',
      isValid: false
    };

    Mock.activityStructure = {
      rn: 1234567,
      acronym: 'PASC',
      name: 'Pressão Arterial',
      error: '',
      category: 'Normal',
      isValid: false
    };
    Mock.activityError1 = {
      rn: 1234567,
      acronym: 'PASC',
      name: 'Pressão Arterial',
      error: 'Número de recrutamento inválido! Categoria {C1} inválida! Usuário {otus@solutions.com.br} inválido! Aferidor {otus@solutions.com.br} inválido! Questão {QUESTIONID} deveria estar preenchida! ',
      category: 'C1',
      isValid: false
    };
    Mock.activityError2 = {
      rn: 1234567,
      acronym: 'PASC',
      name: 'Pressão Arterial',
      error: 'Número de recrutamento inválido! Categoria {C1} inválida! Usuário {otus@solutions.com.br} inválido! Aferidor {otus@solutions.com.br} inválido! Questão {QUESTIONID} não deveria estar preenchida! ',
      category: 'C1',
      isValid: false
    };
    Mock.activityError3 = {
      rn: 1234567,
      acronym: 'PASC',
      name: 'Pressão Arterial',
      error: 'Número de recrutamento inválido! Usuário {otus@solutions.com.br} inválido! Aferidor {otus@solutions.com.br} inválido! Questão {QUESTIONID} deveria estar preenchida! ',
      category: 'C1',
      isValid: false
    };
    Mock.activityError4 = {
      rn: 1234567,
      acronym: 'PASC',
      name: 'Pressão Arterial',
      error: 'Categoria {C1} inválida! Usuário {otus@solutions.com.br} inválido! Aferidor {otus@solutions.com.br} inválido! Questão {QUESTIONID} deveria estar preenchida! ',
      category: 'C1',
      isValid: false
    };
    Mock.activityError5 = {
      rn: 1234567,
      acronym: 'PASC',
      name: 'Pressão Arterial',
      error: 'Número de recrutamento inválido! Categoria {C1} inválida! Aferidor {otus@solutions.com.br} inválido! Questão {QUESTIONID} deveria estar preenchida! ',
      category: 'C1',
      isValid: false
    };
    Mock.activityError6 = {
      rn: 1234567,
      acronym: 'PASC',
      name: 'Pressão Arterial',
      error: 'Número de recrutamento inválido! Categoria {C1} inválida! Usuário {otus@solutions.com.br} inválido! Questão {QUESTIONID} deveria estar preenchida! ',
      category: 'C1',
      isValid: false
    };
    Mock.activityError7 = {
      rn: 1234567,
      acronym: 'PASC',
      name: 'Pressão Arterial',
      error: 'Número de recrutamento inválido! Categoria {C1} inválida! Usuário {otus@solutions.com.br} inválido! Aferidor {otus@solutions.com.br} inválido! ',
      category: 'C1',
      isValid: false
    };

    Mock.response = {
      recruitmentNumberValidationResult: {
        recruitmentNumber: 1234567,
        isValid: false
      },
      categoryValidationResult: {
        category: "C1",
        isValid: false
      },
      interviewerValidationResult: {
        email: "otus@solutions.com.br",
        isValid: false
      },
      paperInterviewerValidationResult: {
        email: "otus@solutions.com.br",
        isValid: false
      },
      questionFillValidationResult: {
        questionId: "Q1",
        shouldBeFilled: true
      }
    }
  }

});
