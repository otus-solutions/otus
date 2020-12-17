describe('laboratoryAliquotsManagerCtrl_UnitTest_Suite', () => {

  let controller;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    _mockInitialize();

    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('$element', Mock.$element);
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Test.utils.data.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller, $rootScope) {
      Injections.$scope = $rootScope.$new();
      Injections.$element = $injector.get('$element');
      Injections.AliquotTubeService = $injector.get('otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService');
      Injections.LaboratoryConfigurationService = $injector.get('otusjs.laboratory.configuration.LaboratoryConfigurationService');
      Injections.Validation = $injector.get('otusjs.laboratory.business.participant.aliquot.AliquotValidationService');
      Injections.LocationPointRestService = $injector.get('otusjs.deploy.LocationPointRestService');
      Injections.LocationPointFactory = $injector.get('otusjs.model.locationPoint.LocationPointFactory');
      Injections.AliquotMessagesService = $injector.get('otusjs.laboratory.business.participant.aliquot.AliquotMessagesService');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      controller =  $controller('laboratoryAliquotsManagerCtrl', Injections);
      _mockBindings();

      spyOn(Injections.LaboratoryConfigurationService, 'getCodeConfiguration').and.returnValue(Mock.codeConfiguration);
      spyOn(Injections.LaboratoryConfigurationService, 'getAliquotLengths').and.returnValue(Mock.aliquotLengths);
      spyOn(Injections.LocationPointRestService, 'getUserLocationPoint').and.returnValue(Promise.resolve(Mock.locationPoint));
      spyOn(Injections.LocationPointFactory, 'fromArray').and.returnValue([Mock.locationPoint]);

      Injections.LocationPointRestService.initialize();
    });
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.aliquotInputOnChange).toBeDefined();
    expect(controller.aliquotInputOnBlur).toBeDefined();
    expect(controller.updateExamsProcessingDate).toBeDefined();
    expect(controller.updateExamsLocationPoint).toBeDefined();
    expect(controller.getConvertedHistory).toBeDefined();
    expect(controller.saveAliquots).toBeDefined();
    expect(controller.haveAliquotsChanged).toBeDefined();
    expect(controller.setFocus).toBeDefined();
    expect(controller.tubeInputOnChange).toBeDefined();
    expect(controller.aliquotInputOnKeyDown).toBeDefined();
    expect(controller.convertAliquot).toBeDefined();
    expect(controller.deleteAliquot).toBeDefined();
    expect(controller.updateAliquots).toBeDefined();
  });

  it('onInit_method_should_invoke_internal_methods', () => {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();

    controller.$onInit();

    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
  });

  function _mockInitialize(){
    Mock.$element = angular.element('<div></div>');

    Mock.participant = angular.copy(Test.utils.data.selectedParticipant);

    Mock.codeConfiguration = {
      waveNumberToken: 1,
      tubeToken: 'tubeToken',
      cryotubeToken: 'cryotubeToken',
      palletToken: 'palletToken'
    };

    Mock.aliquotLengths = [];

    Mock.locationPoint = {
      data: Test.utils.data.locationPoint
    };
  }

  function _mockBindings(){
    controller.participantLaboratory = angular.copy(Test.utils.data.participantLaboratory);
    controller.participantManager = {
      getParticipant: function (rn) { return Mock.participant;}
    };
    controller.originalTube = {};
    controller.tube = {};
    controller.updateAliquots = {};
  }

});