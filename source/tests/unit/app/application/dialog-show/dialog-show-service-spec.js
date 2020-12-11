describe('DialogShowService_UnitTest_Suite', function () {
  var service;
  var Mock = {};
  var Injections = [];


  beforeEach(function () {
    angular.mock.module('otusjs.otus');

    angular.mock.inject(function ($injector) {
      Injections.$mdDialog = $injector.get('$mdDialog');
      service = $injector.get('otusjs.application.dialog.DialogShowService', Injections);
    });

    mockData();
    spyOn(Injections.$mdDialog, 'show').and.callThrough();
  });

  it('service_existence_check', function () {
    expect(service).toBeDefined();
  });

  it('service_method_existence_check', function () {
    expect(service.showDialog).toBeDefined();
    expect(service.showConfirmationDialog).toBeDefined();
    expect(service.showCustomizedDialog).toBeDefined();
    expect(service.showActivitySharingDialog).toBeDefined();
  });

  describe('serviceInstance', function () {

    it('should_showDialog_an_instance_with_the_same_values', function () {
      service.showDialog(Mock.data).then(function (serviceShowResult) {
        expect(serviceShowResult.test.locals.data).toEqual(Mock.data);
      });
    });

    it('should_showConfirmationDialog_an_instance_with_the_same_values', function () {
      service.showConfirmationDialog(Mock.data.titleToText, Mock.data.textDialog, Mock.data.ariaLabel).then(function (serviceShowResult) {
        expect(serviceShowResult.test.locals.data.dialogToTitle).toEqual(Mock.data.titleToText);
        expect(serviceShowResult.test.locals.data.titleToText).toEqual(Mock.data.titleToText);
        expect(serviceShowResult.test.locals.data.textDialog).toEqual(Mock.data.textDialog);
        expect(serviceShowResult.test.locals.data.ariaLabel).toEqual(Mock.data.ariaLabel);
      });
    });

    it('should_showWarningDialog_an_instance_with_the_same_values', function () {
      service.showWarningDialog(Mock.data.dialogToTitle, Mock.data.titleToText, Mock.data.textDialog, Mock.data.ariaLabel).then(function (serviceShowResult) {
        expect(serviceShowResult.test.locals.data.dialogToTitle).toEqual("Confirmação");
        expect(serviceShowResult.test.locals.data.titleToText).toEqual(Mock.data.titleToText);
        expect(serviceShowResult.test.locals.data.textDialog).toEqual(Mock.data.textDialog);
        expect(serviceShowResult.test.locals.data.ariaLabel).toEqual(Mock.data.ariaLabel);
      });
    });

    it('should_showCustomizedDialog_an_instance_with_the_same_values', function () {
      service.showCustomizedDialog(Mock.data).then(function (serviceShowResult) {
        expect(serviceShowResult.test.locals.data).toEqual(Mock.data);
      });
    });

    it('should_showActivitySharingDialog_an_instance_with_the_same_values', function () {
      Mock.selectedActivity = {};
      service.showActivitySharingDialog(Mock.selectedActivity);
      expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1);
      expect(service.data.activity).toEqual(Mock.selectedActivity);
    });

    it('should_showExpressActivityCreationDialog_an_instance_with_the_same_values', function () {
      Mock.preActivityArtefacts = {};
      service.showExpressActivityCreationDialog(Mock.preActivityArtefacts);
      expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1);
      expect(service.data.preActivityArtefacts).toEqual(Mock.preActivityArtefacts);
    });

    it('cancel_method_should_invoke_mdDialog_cancel_method', function(){
      spyOn(Injections.$mdDialog, 'cancel');
      service.cancel();
      expect(Injections.$mdDialog.cancel).toHaveBeenCalledTimes(1);
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
          action: function () { Injections.$mdDialog.hide() },
          class: 'md-raised md-primary'
        }
      ]
    };
  }
});
