fdescribe('dialogShowService', function () {
  var service;
  var Mock = {};
  var Injections;


  beforeEach(function () {
    angular.mock.module('otusjs.application.dialog');
    Mock.mdDialog = {
      show: function (dialog) {
        var self = this;
        self.test = dialog;
        return Promise.resolve(self);
      }
    };

    angular.mock.module(function ($provide) {
      $provide.value('$mdDialog', Mock.mdDialog);
    });

    angular.mock.inject(function (_$injector_) {
      Injections = {
        $mdDialog: _$injector_.get('$mdDialog')
      };
      service = _$injector_.get('otusjs.application.dialog.DialogShowService', Injections);
    });

    mockData();
    spyOn(Mock.mdDialog, 'show').and.callThrough();

  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  describe('serviceInstance', function () {

    it('showDialogMethodExistence check', function () {
      expect(service.showDialog).toBeDefined();
      expect(service.showConfirmationDialog).toBeDefined();
      expect(service.showCustomizedDialog).toBeDefined();
      expect(service.showActivitySharingDialog).toBeDefined();
    });

    it('should showDialog an instance with the same values', function () {
      service.showDialog(Mock.data).then(function (serviceShowResult) {
        expect(serviceShowResult.test.locals.data).toEqual(Mock.data);
      });
    });

    it('should showConfirmationDialog an instance with the same values', function () {
      service.showConfirmationDialog(Mock.data.titleToText, Mock.data.textDialog, Mock.data.ariaLabel).then(function (serviceShowResult) {
        expect(serviceShowResult.test.locals.data.dialogToTitle).toEqual("Confirmação");
        expect(serviceShowResult.test.locals.data.titleToText).toEqual(Mock.data.titleToText);
        expect(serviceShowResult.test.locals.data.textDialog).toEqual(Mock.data.textDialog);
        expect(serviceShowResult.test.locals.data.ariaLabel).toEqual(Mock.data.ariaLabel);
      });
    });

    it('should showCustomizedDialog an instance with the same values', function () {
      service.showCustomizedDialog(Mock.data).then(function (serviceShowResult) {
        expect(serviceShowResult.test.locals.data).toEqual(Mock.data);
      });
    });

    it('should showActivitySharingDialog an instance with the same values', function () {
      service.showActivitySharingDialog(Mock.data2.activity).then(function (serviceShowResult) {
        expect(serviceShowResult.test.locals.data.activity).toEqual(Mock.data2.activity);
      });
    });


  });

  function mockData() {
    Mock.data = {
      dimensionsDialog: { 'min-height': '200px', 'min-width': '300px' },
      dialogToTitle: 'Alíquota',
      titleToText: 'ALÍQUOTA NÃO REMOVIDA',
      textDialog: 'Confirmação de leitura',
      ariaLabel: 'Confirmação de leitura',
      buttons: [
        {
          message: 'Ok',
          action: function () { $mdDialog.hide() },
          class: 'md-raised md-primary'
        }
      ]
    };

    Mock.data2 = {};
    Mock.data2.activity = {
      dialogToTitle: 'Confirmação',
      titleToText: 'ALÍQUOTA NÃO REMOVIDA',
      textDialog: 'Confirmação de leitura',
      ariaLabel: 'Confirmação de leitura',
      buttons: []
    };
  }
});
