describe('otusLaboratoryCtrl_UnitTest_Suite', () => {
  let controller;
  let Injections = [];

  beforeEach(() => {
    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Test.utils.data.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller, $rootScope) {
      Injections.$q = $injector.get('$q');
      Injections.DialogShowService = $injector.get('otusjs.application.dialog.DialogShowService');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.UnattachedLaboratoryService = $injector.get('otusjs.laboratory.business.unattached.UnattachedLaboratoryService');
      Injections.LoadingScreenService = $injector.get('otusjs.deploy.LoadingScreenService');
      Injections.EventService = $injector.get('otusjs.laboratory.core.EventService');
      Injections.Publisher = $injector.get('otusjs.otus.uxComponent.Publisher');
      Injections.ParticipantFactory = $injector.get('otusjs.model.participant.ParticipantFactory');
      Injections.$scope = $rootScope.$new();
      Injections.LaboratoryLocalStorageService = $injector.get('otusjs.laboratory.storage.LaboratoryLocalStorageService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller =  $controller('otusLaboratoryCtrl', Injections);

      spyOn(Injections.ParticipantLaboratoryService, 'initializeLaboratory').and.returnValue(Promise.resolve(true));
    });
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.initializeLaboratory).toBeDefined();
    expect(controller.attacheLaboratory).toBeDefined();
  });

  it('onInit_method_should_invoke_internal_methods', () => {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
    spyOn(Injections.ParticipantLaboratoryService, 'getSelectedParticipant').and.returnValue(Promise.resolve({}));
    spyOn(Injections.ParticipantFactory, 'fromJson').and.returnValue(Promise.resolve({}));
    spyOn(Injections.ParticipantLaboratoryService, 'hasLaboratory').and.returnValue(Promise.resolve(true));

    controller.$onInit();

    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantLaboratoryService.getSelectedParticipant).toHaveBeenCalledTimes(1);
    expect(Injections.ParticipantLaboratoryService.hasLaboratory).toHaveBeenCalledTimes(1);
  });

  it('initializeLaboratory_method_should_call_ParticipantLaboratoryService.initializeLaboratory', () => {
    controller.initializeLaboratory();
    expect(Injections.ParticipantLaboratoryService.initializeLaboratory).toHaveBeenCalledTimes(1);
  });

});