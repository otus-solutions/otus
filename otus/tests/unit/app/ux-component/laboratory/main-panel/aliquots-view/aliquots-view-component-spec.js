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
          }
          return Promise.reject(err);
        }
      }
    }

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.laboratory.business.participant.aliquot.ParticipantAliquotService', Mock.AliquotTubeService);
      $provide.value('otusjs.laboratory.configuration.LaboratoryConfigurationService', {});
      $provide.value('otusjs.laboratory.business.participant.ParticipantLaboratoryService', {});
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

  function mockController() {
    Mock.aliquot = {
      aliquotCode: "323004438"
    };

    ctrl.selectedMomentType = {
      removeAliquot: function (code) {

      }
    }
  }



});