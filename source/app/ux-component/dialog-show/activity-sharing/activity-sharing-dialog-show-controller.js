(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .controller('activititySharingDialogShowController', Controller);

  function Controller(data) {
    let self = this;
    var DEFAULT_DIMENSIONS = {'min-height':'200px', 'min-width':'300px'};

    self.titleToDialog = data.dialogToTitle;
    self.title =  data.titleToText;
    self.text = data.textDialog;

    self.linkTypes = [
      {title: "Somente link", action: "link"},
      {title: "Identificação + link", action: "fullLink"}
    ];

    // self.showTextInput = !!data.textInputConfig;
    // if (self.showTextInput){
    //   self.textInputLabel = data.textInputConfig ? data.textInputConfig.label : "";
    //   self.textInputAriaLabel = data.textInputConfig ? data.textInputConfig.ariaLabel : "";
    // }
    //
    // self.showDropDown = !!data.dropDownConfig;
    // if(self.showDropDown){
    //   self.dropDownValues = data.dropDownConfig.values ? data.dropDownConfig.values : [];
    //   self.dropDownIsRequired = data.dropDownConfig.isRequired ? data.dropDownConfig.isRequired : false;
    //   self.dropDownLabel = data.dropDownConfig.label ? data.dropDownConfig.label : "";
    //   self.dropDownAriaLabel = data.dropDownConfig.ariaLabel ? data.dropDownConfig.ariaLabel : "";
    // }
    // self.labelAria = data.ariaLabel;
    // self.img = data.imgSrc;
    // self.style = data.imgStyle;
    // self.buttons = data.buttons;
    // self.cancel = data.cancel;
    //
    // /* Public methods */
    // self.isAvailableImage = isAvailableImage;
    //
    // _useDefaultDimensions();
    //
    // function isAvailableImage() {
    //   return '' !== data.imgSrc;
    // }
    //
    // function _useDefaultDimensions() {
    //   if(!data.dimensionsDialog){
    //     self.dialogDimensions = DEFAULT_DIMENSIONS;
    //   } else {
    //     self.dialogDimensions = data.dimensionsDialog;
    //   }
    // }
  }
}());