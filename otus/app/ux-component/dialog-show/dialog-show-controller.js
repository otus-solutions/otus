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
    vm.showInput = data.showInput;
    vm.showTextInput = !!data.textInputConfig;
    vm.textInputLabel = data.textInputConfig ? data.textInputConfig.label : "";
    vm.showDropDown = !!data.dropDownConfig;
    if(vm.showDropDown){
      vm.dropDownValues = data.dropDownConfig.values ? data.dropDownConfig.values : [];
      vm.dropDownIsRequired = data.dropDownConfig.isRequired ? data.dropDownConfig.isRequired : false;
      vm.dropDownLabel = data.dropDownConfig.label ? data.dropDownConfig.label : "";
    }
    vm.labelAria = data.ariaLabel;
    vm.img = data.imgSrc;
    vm.style = data.imgStyle;
    vm.buttons = data.buttons;
    vm.cancel = data.cancel;

    /* Public methods */
    vm.isAvailableImage = isAvailableImage;

    useDefaultDimensions();

    function isAvailableImage() {
      return '' !== data.imgSrc;
    }

    function useDefaultDimensions() {
      if(!data.dimensionsDialog){
        vm.dialogDimensions = DEFAULT_DIMENSIONS;
      } else {
        vm.dialogDimensions = data.dimensionsDialog;
      }
    }
  }
}());