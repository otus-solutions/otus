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
    vm.inputLabel = data.inputLabel;
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