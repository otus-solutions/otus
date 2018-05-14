describe('Exam Lot Service Test', function() {
  var Mock = {};
  var Injections = {};
  var service;
  var messageLoading =
    'Por favor aguarde o carregamento das alíquotas.<br> Esse processo pode demorar um pouco...';


  beforeEach(function() {
    angular.mock.module('otusjs.laboratory.business.project.exams');
  });

  beforeEach(function() {

    Mock = {
      LoadingScreenService : {
      start: () => {
          return Promise.resolve();
      },
      changeMessage: () => {},
      finish: () => {
        // return Promise.resolve();
      }
    },
    ExamService : {
      createAliquotLot : () => {},
      buildAliquotLotFromJson: (JSON) => {}
    },
    LaboratoryConfigurationService :{
      create: () => {}
    },
    ProjectRepositoryService :{
      createLot: (lotStructure) => {
        return Promise.resolve({data: []});
      },
      updateLot: (lotStructure) => {
        return Promise.resolve({data: []});
      }
    }

  }

    angular.mock.module(function($provide) {
      $provide.value('otusjs.deploy.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('otusjs.laboratory.exam.ExamService', Mock.ExamService);
      $provide.value('otusjs.laboratory.business.configuration.LaboratoryConfigurationService', Mock.LaboratoryConfigurationService);
      $provide.value('otusjs.laboratory.repository.ProjectRepositoryService', Mock.ProjectRepositoryService);
    });
  })

  beforeEach(function() {
    inject(function(_$injector_) {
      Injections = {
        $q : _$injector_.get('$q'),
        LoadingScreenService: Mock.LoadingScreenService,
        ProjectRepositoryService: Mock.ProjectRepositoryService
      }
      service = _$injector_.get('otusjs.laboratory.business.project.exams.ExamLotService', Injections);


    });
  });

  describe("method createLot", function() {
    beforeEach(function() {
      spyOn(Injections.ProjectRepositoryService, 'createLot').and.callFake(function(lotStructure) {
        Injections.LoadingScreenService.finish();
        return Promise.resolve({data:[]});
      });
      spyOn(service, 'createLot').and.callThrough();
      spyOn(Injections.LoadingScreenService, 'start').and.callThrough();
      spyOn(Injections.LoadingScreenService, 'changeMessage').and.callThrough();
      spyOn(Injections.LoadingScreenService, 'finish').and.callThrough();
      service.createLot(jasmine.any(JSON));
    });

    it('should call LoadingScreenService in createLot', function() {
      expect(service.createLot).toHaveBeenCalledWith(jasmine.any(JSON));
      expect(Injections.LoadingScreenService).toBeTruthy();
      expect(Injections.LoadingScreenService.start).toHaveBeenCalled();
      expect(Injections.LoadingScreenService.changeMessage).toHaveBeenCalledWith(messageLoading);
      expect(Injections.ProjectRepositoryService.createLot).toHaveBeenCalledWith(jasmine.any(JSON));
      expect(Injections.LoadingScreenService.finish).toHaveBeenCalled();
    });

  });

  describe("method updateLot", function() {
    beforeEach(function() {
      spyOn(Injections.ProjectRepositoryService, 'updateLot').and.callFake(function(lotStructure) {
        Injections.LoadingScreenService.finish();
        return Promise.resolve({data:[]});
      });
      spyOn(service, 'updateLot').and.callThrough();
      spyOn(Injections.LoadingScreenService, 'start').and.callThrough();
      spyOn(Injections.LoadingScreenService, 'changeMessage').and.callThrough();
      spyOn(Injections.LoadingScreenService, 'finish').and.callThrough();
      service.updateLot(jasmine.any(JSON));
    });

    it('should call LoadingScreenService in updateLot', function() {
      expect(service.updateLot).toHaveBeenCalledWith(jasmine.any(JSON));
      expect(Injections.LoadingScreenService).toBeTruthy();
      expect(Injections.LoadingScreenService.start).toHaveBeenCalled();
      expect(Injections.LoadingScreenService.changeMessage).toHaveBeenCalledWith(messageLoading);
      expect(Injections.ProjectRepositoryService.updateLot).toHaveBeenCalledWith(jasmine.any(JSON));
      expect(Injections.LoadingScreenService.finish).toHaveBeenCalled();
    });

  });

});
