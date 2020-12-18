describe('aliquotsViewCtrl_UnitTest_Suite', function () {

  var controller;
  var Injections = [];
  var Mock = {};

  beforeEach(function () {
    _mockInjections();

    angular.mock.module('otusjs.otus');

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratory.business.participant.ParticipantLaboratoryService', Mock.ParticipantLaboratoryService);
      $provide.value('otusjs.laboratory.business.participant.aliquot.AliquotMessagesService', Mock.AliquotMessagesService);
      $provide.value('otusjs.laboratory.business.participant.aliquot.AliquotValidationService', {});
      $provide.value('$scope', {});
      $provide.value('$element', {});
      $provide.value('mdcDefaultParams', function () {});
      $provide.value('otusjs.laboratoryViewerService.LaboratoryViewerService', Test.utils.data.LaboratoryViewerService);
    });

    angular.mock.inject(function ($injector, $controller, $rootScope) {
      Injections.AliquotTubeService = $injector.get('otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService');
      Injections.LaboratoryConfigurationService = $injector.get('otusjs.laboratory.configuration.LaboratoryConfigurationService');
      Injections.ParticipantLaboratoryService = $injector.get('otusjs.laboratory.business.participant.ParticipantLaboratoryService');
      Injections.AliquotMessagesService = $injector.get('otusjs.laboratory.business.participant.aliquot.AliquotMessagesService');
      Injections.Validation = $injector.get('otusjs.laboratory.business.participant.aliquot.AliquotValidationService');
      Injections.Publisher = $injector.get('otusjs.otus.uxComponent.Publisher');
      Injections.$scope = $rootScope.$new();
      Injections.$element = $injector.get('$element');
      Injections.mdcDefaultParams = $injector.get('mdcDefaultParams');
      Injections.LaboratoryViewerService = $injector.get('otusjs.laboratoryViewerService.LaboratoryViewerService');

      jasmine.clock().install();
      jasmine.clock().tick(50);
      controller = $controller('aliquotsViewCtrl', Injections, {participantLaboratory: {tubes: {}}});
      mockController();
    });
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  it('controller_existence_check', () => {
    expect(controller).toBeDefined();
  });

  it('controller_methods_existence_check', () => {
    expect(controller.$onInit).toBeDefined();
    expect(controller.deleteAliquot).toBeDefined();
    expect(controller.selectMomentType).toBeDefined();
    expect(controller.completePlaceholder).toBeDefined();
    expect(controller.aliquotInputOnChange).toBeDefined();
    expect(controller.tubeInputOnChange).toBeDefined();
    expect(controller.aliquotInputOnKeyDown).toBeDefined();
    expect(controller.tubeInputOnBlur).toBeDefined();
    expect(controller.aliquotInputOnBlur).toBeDefined();
    expect(controller.getConvertedHistory).toBeDefined();
    expect(controller.setFocus).toBeDefined();
    expect(controller.convertAliquot).toBeDefined();
  });

  it('onInit_method_should_invoke_internal_methods', () => {
    spyOn(Injections.LaboratoryViewerService, 'checkExistAndRunOnInitOrBackHome').and.callThrough();
    spyOn(Injections.LaboratoryConfigurationService, 'getCodeConfiguration').and.returnValue(Test.utils.data.codeConfiguration);
    spyOn(Injections.LaboratoryConfigurationService, 'getAliquotLengths').and.returnValue([]);
    spyOn(Injections.AliquotTubeService, 'buildMomentTypeList').and.returnValue({});
    spyOn(Injections.AliquotTubeService, 'areFieldsChanged').and.returnValue(true);
    Injections.ParticipantLaboratoryService.participant = Test.utils.data.selectedParticipant;
    controller.$onInit();
    expect(Injections.LaboratoryViewerService.checkExistAndRunOnInitOrBackHome).toHaveBeenCalledTimes(1);
  });

  describe('deleteAliquot_method', function () {
    var originalTimeout;
    beforeEach(function () {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      spyOn(controller, 'deleteAliquot').and.callThrough();
      spyOn(controller.selectedMomentType, 'removeAliquot').and.callThrough();
      spyOn(Injections.AliquotMessagesService, 'showDeleteDialog').and.callThrough();
      spyOn(Injections.AliquotMessagesService, 'showNotRemovedDialog').and.callThrough();
      spyOn(Injections.AliquotTubeService, 'deleteAliquot').and.callThrough();
    });

    it('should_remove_aliquot', function (done) {
      controller.deleteAliquot(Mock.aliquot);
      Injections.AliquotMessagesService.showDeleteDialog().then(function () {
        Injections.AliquotTubeService.deleteAliquot(Mock.aliquot).then(function () {
          expect(controller.selectedMomentType.removeAliquot).toHaveBeenCalledTimes(1);
          done();
        }).catch(function () {
          done();
        });
        done();
      }).catch(function () {
        done();
      });
    });

    it('should not remove aliquot', function (done) {
      controller.deleteAliquot(false);
      Injections.AliquotMessagesService.showDeleteDialog().then(function () {
        Injections.AliquotTubeService.deleteAliquot(false).then(function () {
          done();
        }).catch(function () {
          expect(Injections.AliquotMessagesService.showNotRemovedDialog).toHaveBeenCalledTimes(1);
          done();
        });
        done();
      }).catch(function () {
        done();
      });
    });


  });

  describe('convertAliquot method', function () {
    var originalTimeout;
    beforeEach(function () {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      spyOn(controller, 'convertAliquot').and.callThrough();
      spyOn(Injections.AliquotMessagesService, 'showConvertDialog').and.callThrough();
      spyOn(Injections.AliquotMessagesService, 'showNotConvertedDialog').and.callThrough();
      spyOn(Injections.ParticipantLaboratoryService, 'convertStorageAliquot').and.callThrough();
      spyOn(Injections.AliquotTubeService, 'populateAliquotsArray').and.callThrough();
    });

    it('should not convert storage aliquot to exam', function () {
      controller.convertAliquot(Mock.storageAliquot);

      Injections.AliquotMessagesService.showConvertDialog().then(function () {
        Injections.ParticipantLaboratoryService.convertStorageAliquot(Mock.storageAliquot).then(function () {
          fail();
        }).catch(function () {
          expect(Injections.AliquotMessagesService.showNotConvertedDialog).toHaveBeenCalledTimes(0);
        });
      }).catch(function () {});
    });
  });

  describe('getConvertedHistory method', function () {

    it('should return CONVERTED_STORAGE history', function () {
      var history = controller.getConvertedHistory(Mock.aliquot);
      expect(history).toEqual({});
    });

  });


  function mockController() {
    Mock.aliquot = {
      aliquotCode: "323004438",
      getHistoryByType: function () {
        return [{}]
      }
    };

    Mock.storageAliquot = {
      aliquotCode: "323004438",
      convertStorage: function () { return true; },
      name: "name2",
      role: "STORAGE"
    };

    controller.examTypeList = new Set();
    controller.examTypeList.add({label:"label1",name:"name1"});
    controller.examTypeList.add({label:"label2",name:"name2"});
    controller.examTypeList.add({label:"label3",name:"name3"});

    controller.selectedMomentType = {
      exams: [],
      storages:[],
      convertedStorages: [Mock.aliquot],
      removeAliquot: function (code) {},
      removeStorage: function () {}
    }
  }

  function _mockInjections(){
    Mock.AliquotMessagesService = {
      showDeleteDialog: function () {
        return Promise.resolve();
      },
      showNotRemovedDialog: function () {
        return Promise.resolve();
      },
      showConvertDialog: function () {
        return Promise.resolve({examName:"label1",observation:"teste"});
      },
      showNotConvertedDialog: function () {
        return Promise.resolve( );
      },
      showExitDialog: function(){
        return Promise.resolve();
      }
    };

    Mock.ParticipantLaboratoryService = {
      convertStorageAliquot: function (aliquot) {
        if (aliquot.shouldConvert === true) {
          return Promise.resolve();
        } else {
          var err = {
            data: {
              CONTENT: {}
            }
          };
          return Promise.reject(err);
        }
      },
      getLoggedUser: function () {
        return {
          email:"teste@teste.com"
        }
      }
    };
  }

});