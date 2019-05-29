describe('dialogShowController', function () {
  var Mock = {};
  var ctrl;
  var DEFAULT_DIMENSIONS = {'min-height':'200px', 'min-width':'300px'};

  beforeEach(function () {
    angular.mock.module('otusjs.otus.uxComponent');
    angular.mock.inject(function($controller) {
      mockData();

      ctrl = $controller("dialogShowController",{
        data: Mock.data
      });
    });
    spyOn(ctrl, "isAvailableImage").and.callThrough();
  });

  it('ctrlExistence check', function () {
    expect(ctrl).toBeDefined();
  });

  it('ctrlMethodsExistence_check', function () {
    expect(ctrl.isAvailableImage).toBeDefined();
  });

  it('isAvailableImageMethodExistence check and test return', function () {
    ctrl.isAvailableImage();
    expect(ctrl.isAvailableImage).toHaveBeenCalledTimes(1);
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
    expect(ctrl.showTextInput).toBeTruthy();
    expect(ctrl.textInputLabel).toEqual(Mock.data.textInputConfig.label);
    expect(ctrl.textInputAriaLabel).toEqual(Mock.data.textInputConfig.ariaLabel);
    expect(ctrl.showDropDown).toBeTruthy();
    expect(ctrl.dropDownValues).toEqual(Mock.data.dropDownConfig.values);
    expect(ctrl.dropDownIsRequired).toEqual(Mock.data.dropDownConfig.isRequired);
    expect(ctrl.dropDownLabel).toEqual(Mock.data.dropDownConfig.label);
    expect(ctrl.dropDownAriaLabel).toEqual(Mock.data.dropDownConfig.ariaLabel);
  });

  it('should useDefaultDimensions an instance with the result defined', function () {
    expect(ctrl.dialogDimensions).toEqual(Mock.data.dimensionsDialog);
  });

  describe('ctrlInstance', function () {

    beforeEach(function () {
      angular.mock.inject(function($controller) {
        mockData();

        ctrl = $controller("dialogShowController",{
          data: Mock.dataNotDimensionsDialog
        });
      });
    });

    it('should useDefaultDimensions an instance with the result undefined', function () {
      expect(ctrl.dialogDimensions).toEqual(DEFAULT_DIMENSIONS);
    });

  });

  function mockData() {
    Mock.data = {
      dimensionsDialog:{'min-height':'210px', 'min-width':'300px'},
      dialogToTitle:'Alíquota',
      titleToText:'ALÍQUOTA NÃO REMOVIDA',
      textDialog:'Confirmação de leitura',
      ariaLabel:'Confirmação de leitura',
      textInputConfig: {
        label:'Teste',
        ariaLabel:'Teste'
      },
      dropDownConfig:  {
        values:"666",
        isRequired:true,
        label:'Teste',
        ariaLabel:'Teste'
      },
      cancel:function(){$mdDialog.cancel()},
      buttons: [
        {
          message:'Ok',
          action:function(){$mdDialog.hide()},
          class:'md-raised md-primary'
        }
      ]
    };

    Mock.dataNotDimensionsDialog = {
      dimensionsDialog:""
    };
  }
});

