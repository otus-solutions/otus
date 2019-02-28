describe('dialogShowController', function () {
  var Mock = {};
  var ctrl;
  var DEFAULT_DIMENSIONS = {'min-height':'200px', 'min-width':'300px'};

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');
  });

  describe('ctrlInstance', function () {

    beforeEach(function () {
      angular.mock.inject(function($controller) {
        mockData();

        ctrl = $controller("dialogShowController",{
          data: Mock.data
        });
      });
    });

    it('ctrlExistence check', function () {
      expect(ctrl).toBeDefined();
    });

    it('isAvailableImageMethodExistence check and test return', function () {
      expect(ctrl.isAvailableImage).toBeDefined();
      expect(ctrl.isAvailableImage).toBeTruthy();
    });

    it('should ctrl an instance with the same values ​​and img style with undefined results', function () {
      expect(ctrl.buttons).toEqual(Mock.data.buttons);
      expect(ctrl.titleToDialog).toEqual(Mock.data.dialogToTitle);
      expect(ctrl.title).toEqual(Mock.data.titleToText);
      expect(ctrl.text).toEqual(Mock.data.textDialog);
      expect(ctrl.labelAria).toEqual(Mock.data.ariaLabel);
      expect(ctrl.img).toBeUndefined();
      expect(ctrl.style).toBeUndefined();
      expect(ctrl.cancel).toEqual(Mock.data.cancel);
    });

    it('should useDefaultDimensions an instance with the result defined', function () {
      expect(ctrl.dialogDimensions).toBeDefined();
      expect(ctrl.dialogDimensions).toEqual(DEFAULT_DIMENSIONS);
    });

  });

  function mockData() {
    Mock.data = {
      dimensionsDialog:{'min-height':'200px', 'min-width':'300px'},
      dialogToTitle:'Alíquota',
      titleToText:'ALÍQUOTA NÃO REMOVIDA',
      textDialog:'Confirmação de leitura',
      ariaLabel:'Confirmação de leitura',
      cancel:function(){$mdDialog.cancel()},
      buttons: [
        {
          message:'Ok',
          action:function(){$mdDialog.hide()},
          class:'md-raised md-primary'
        }
      ]
    };
  }
});

