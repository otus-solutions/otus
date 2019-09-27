(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('dialogShowController',DialogController);

  function DialogController(data) {
    var vm = this;
    var DEFAULT_DIMENSIONS = {'min-height':'200px', 'min-width':'300px'};

    vm.titleToDialog = data.dialogToTitle;
    vm.title =  data.titleToText;
    vm.text = data.textDialog;

    vm.showTextInput = !!data.textInputConfig;
    if (vm.showTextInput){
      vm.textInputLabel = data.textInputConfig ? data.textInputConfig.label : "";
      vm.textInputAriaLabel = data.textInputConfig ? data.textInputConfig.ariaLabel : "";
    }

    vm.showDropDown = !!data.dropDownConfig;
    if(vm.showDropDown){
      vm.dropDownValues = data.dropDownConfig.values ? data.dropDownConfig.values : [];
      vm.dropDownIsRequired = data.dropDownConfig.isRequired ? data.dropDownConfig.isRequired : false;
      vm.dropDownLabel = data.dropDownConfig.label ? data.dropDownConfig.label : "";
      vm.dropDownAriaLabel = data.dropDownConfig.ariaLabel ? data.dropDownConfig.ariaLabel : "";
    }
    vm.labelAria = data.ariaLabel;
    vm.img = data.imgSrc;
    vm.style = data.imgStyle;
    vm.buttons = data.buttons;
    vm.cancel = data.cancel;

    /* Public methods */
    vm.isAvailableImage = isAvailableImage;

    _useDefaultDimensions();

    function isAvailableImage() {
      return '' !== data.imgSrc;
    }

    function _useDefaultDimensions() {
      if(!data.dimensionsDialog){
        vm.dialogDimensions = DEFAULT_DIMENSIONS;
      } else {
        vm.dialogDimensions = data.dimensionsDialog;
      }
    }
  }
}());