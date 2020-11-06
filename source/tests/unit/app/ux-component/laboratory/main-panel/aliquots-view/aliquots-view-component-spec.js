describe('Aliquots View Component', function () {
  var Mock = {};
  var ctrl, $injector, $controller;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  beforeEach(function () {
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
      }
    };

    Mock.AliquotTubeService = {
      deleteAliquot: function (code) {
        if (code) {
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
      populateAliquotsArray: function () {
        return ctrl.selectedMomentType;
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

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService', Mock.AliquotTubeService);
      $provide.value('otusjs.laboratory.configuration.LaboratoryConfigurationService', {});
      $provide.value('otusjs.laboratory.business.participant.ParticipantLaboratoryService', Mock.ParticipantLaboratoryService);
      $provide.value('otusjs.laboratory.business.participant.aliquot.AliquotMessagesService', Mock.AliquotMessagesService);
      $provide.value('otusjs.laboratory.business.participant.aliquot.AliquotValidationService', {});
      $provide.value('otusjs.otus.uxComponent.Publisher', {});
      $provide.value('$scope', {});
      $provide.value('$element', {});
      $provide.value('mdcDefaultParams', function () {
      });
    });
  });

  beforeEach(function () {
    inject(function (_$injector_, _$controller_, _$scope_) {
      $controller = _$controller_;
      $injector = _$injector_;
      Injections = {
        $mdToast: $injector.get('$mdToast')
      };
      jasmine.clock().install();
      jasmine.clock().tick(50);
      ctrl = $controller('aliquotsViewCtrl', Injections, {participantLaboratory: {tubes: {}}});
      mockController();

    });
  });

  afterEach(function () {
    jasmine.clock().uninstall();
  });

  describe('The tests', function () {
    var originalTimeout;
    beforeEach(function () {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
      spyOn(ctrl, 'deleteAliquot').and.callThrough();
      spyOn(ctrl.selectedMomentType, 'removeAliquot').and.callThrough();
      spyOn(Mock.AliquotMessagesService, 'showDeleteDialog').and.callThrough();
      spyOn(Mock.AliquotMessagesService, 'showNotRemovedDialog').and.callThrough();
      spyOn(Mock.AliquotTubeService, 'deleteAliquot').and.callThrough();
      spyOn(Injections.$mdToast, 'show').and.callFake(function () {
        return true;
      });
    });

    it('should remove aliquot', function (done) {

      ctrl.deleteAliquot(Mock.aliquot);

      Mock.AliquotMessagesService.showDeleteDialog().then(function () {
        Mock.AliquotTubeService.deleteAliquot(Mock.aliquot).then(function () {
          expect(ctrl.selectedMomentType.removeAliquot).toHaveBeenCalledTimes(1);
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
      ctrl.deleteAliquot(false);

      Mock.AliquotMessagesService.showDeleteDialog().then(function () {
        Mock.AliquotTubeService.deleteAliquot(false).then(function () {
          done();
        }).catch(function () {
          expect(Mock.AliquotMessagesService.showNotRemovedDialog).toHaveBeenCalledTimes(1);
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
      spyOn(ctrl, 'convertAliquot').and.callThrough();
      spyOn(Mock.AliquotMessagesService, 'showConvertDialog').and.callThrough();
      spyOn(Mock.AliquotMessagesService, 'showNotConvertedDialog').and.callThrough();
      spyOn(Mock.ParticipantLaboratoryService, 'convertStorageAliquot').and.callThrough();
      spyOn(Mock.AliquotTubeService, 'populateAliquotsArray').and.callThrough();
      spyOn(Injections.$mdToast, 'show').and.callFake(function () {
        return true;
      });
    });

    it('should not convert storage aliquot to exam', function () {
      ctrl.convertAliquot(Mock.storageAliquot);

      Mock.AliquotMessagesService.showConvertDialog().then(function () {
        Mock.ParticipantLaboratoryService.convertStorageAliquot(Mock.storageAliquot).then(function () {
          fail();
        }).catch(function () {
          expect(Mock.AliquotMessagesService.showNotConvertedDialog).toHaveBeenCalledTimes(0);
        });
      }).catch(function () {});
    });
  });

  describe('getConvertedHistory method', function () {

    it('should return CONVERTED_STORAGE history', function () {
      var history = ctrl.getConvertedHistory(Mock.aliquot);
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

    ctrl.examTypeList = new Set();
    ctrl.examTypeList.add({label:"label1",name:"name1"});
    ctrl.examTypeList.add({label:"label2",name:"name2"});
    ctrl.examTypeList.add({label:"label3",name:"name3"});

    ctrl.selectedMomentType = {
      exams: [],
      storages:[],
      convertedStorages: [Mock.aliquot],
      removeAliquot: function (code) {

      },
      removeStorage: function () {

      }
    }
  }



});