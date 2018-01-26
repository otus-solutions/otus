(function () {
  'use strict';

  angular
    .module('otusjs.otus.uxComponent')
    .factory('otusjs.otus.uxComponent.DynamicTableSettingsFactory', Factory);

  function Factory() {
    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      return new DynamicTableSettings();
    }

    return self;
  }

  function DynamicTableSettings() {
    var self = this;

    var _ordenationPriorityIndexArray = [
      //{headerIndex: 0, ordenationPriorityIndex: 1}
    ];
    
    self.settings = {
      elementsArray: [],
      elementsProperties: [],
      headers: [],
      callbackAfterChange: undefined,
      tableUpdateFunction: undefined,
      tableTitle: undefined,
      orderIndices: [],
      numberFieldsAlignedLeft: 10,
      flexArray: [],
      alignArray: [],
      formatData: undefined,
      selectUnselectFunction: undefined,
      formatDataPropertiesArray: [],
      formatDataIndexArray: [],
      disableCheckbox: false,
      disableFilter: false,
      disableReorder: false,
      disablePagination: false,
      selectedColor: undefined,
      hoverColor: undefined,
      //new Functionality
      markupAttribute: undefined,
      selectionFunction: undefined,
      buttonFunctionArray: []
    };

    /* Public methods */
    self.getSettings = getSettings;
    self.toJson = toJson;

    self.setElementsArray = setElementsArray;
    self.setCallbackAfterChange = setCallbackAfterChange;
    self.setTableUpdateFunction = setTableUpdateFunction;
    self.setTitle = setTitle;
    self.setNumberFieldsAlignedLeft = setNumberFieldsAlignedLeft;
    self.setFormatData = setFormatData;
    self.setSelectUnselectFunction = setSelectUnselectFunction;
    self.setCheckbox = setCheckbox;
    self.setFilter = setFilter;
    self.setReorder = setReorder;
    self.setPagination = setPagination;
    self.setSelectedColor = setSelectedColor;
    self.setHoverColor = setHoverColor;

    self.addHeader = addHeader;
    self.addColumnProperty = addColumnProperty;
    self.addColumnIconButton = addColumnIconButton;

    function setProperty() {
      return self;
    }

    function addHeader(header, flex, align, ordinationPriorityIndex) {
      self.settings.headers.push(
        header || ''
      );
      
      if (flex === undefined) flex = '';
      self.settings.flexArray.push(flex);
      
      var alignmentAccepted = false;
      var avaliableAlignArray = ['right', 'left', 'center'];
      if(typeof align !== 'string') align = '';
      
      for (var i = 0; i < avaliableAlignArray.length; i++) {
        var avaliableAlign = avaliableAlignArray[i];
        
        if(align.toLowerCase().trim() === avaliableAlign){
          align = avaliableAlign;
          alignmentAccepted = true;
          break;
        }
      }
      
      if(!alignmentAccepted) align = '';
      self.settings.alignArray.push(align);

      if (ordinationPriorityIndex !== undefined) {
        _ordenationPriorityIndexArray.push(
          {
            headerIndex: self.settings.headers.length - 1,
            ordenationPriorityIndex: ordinationPriorityIndex
          }
        );
      }
      return self;
    }

    function addColumnProperty(property, formatType) {
      self.settings.elementsProperties.push(
        property || ''
      );

      if (formatType && formatType.toUpperCase && formatType.toUpperCase() === 'DATE') {
        self.settings.formatDataIndexArray.push(
          self.settings.elementsProperties.length - 1
        );
      }
      _addEmptyHeaderIfNeed();
      return self;
    }

    function addColumnIconButton(
      icon, tooltip, classButton, successMsg, buttonFuntion,
      returnsSuccess, renderElement, renderGrid, removeElement, receiveCallback
    ) {

      self.settings.elementsProperties.push(
        {
          iconButton: {
            icon: icon || '',
            tooltip: tooltip || '',
            classButton: classButton || '',
            successMsg: successMsg || '',
            buttonFuntion: buttonFuntion || function () { console.log('buttonFunction not implemented.') },
            returnsSuccess: returnsSuccess || false,
            renderElement: renderElement || false,
            renderGrid: renderGrid || false,
            removeElement: removeElement || false,
            receiveCallback: receiveCallback || false
          }
        }
      );
      _addEmptyHeaderIfNeed('10','center');
      return self;
    }

    function _addEmptyHeaderIfNeed(flex, align) {
      if (self.settings.elementsProperties.length > self.settings.headers.length) {
        self.addHeader('', flex, align);
      }

      return self;
    }

    function getName() {
      return _name;
    }

    function getSettings() {
      var ordenationArray = _ordenationPriorityIndexArray.sort(function compare(a, b) {
        if (a.ordenationPriorityIndex < b.ordenationPriorityIndex)
          return -1;
        if (a.ordenationPriorityIndex > b.ordenationPriorityIndex)
          return 1;
        return 0;
      });

      self.settings.orderIndices = [];
      ordenationArray.forEach(function(ordenation){
        self.settings.orderIndices.push(ordenation.headerIndex);
      })
      return self.settings;
    }

    function setElementsArray(elementsArray) {
      self.settings.elementsArray = elementsArray;
      return self;
    }

    function setCallbackAfterChange(callbackAfterChange) {
      self.settings.callbackAfterChange = callbackAfterChange;
      return self;
    }

    function setTableUpdateFunction(tableUpdateFunction) {
      self.settings.tableUpdateFunction = tableUpdateFunction;
      return self;
    }

    function setTitle(tableTitle) {
      self.settings.tableTitle = tableTitle;
      return self;
    }

    function setNumberFieldsAlignedLeft(numberFieldsAlignedLeft) {
      self.settings.numberFieldsAlignedLeft = numberFieldsAlignedLeft;
      return self;
    }

    function setFormatData(formatData) {
      self.settings.formatData = formatData;
      return self;
    }

    function setSelectUnselectFunction(selectUnselectFunction) {
      self.settings.selectUnselectFunction = selectUnselectFunction;
      return self;
    }

    function setSelectedColor(selectedColor) {
      self.settings.selectedColor = selectedColor;
      return self;
    }

    function setHoverColor(hoverColor) {
      self.settings.hoverColor = hoverColor;
      return self;
    }

    function setCheckbox(showCheckbox) {
      showCheckbox = showCheckbox ? true : false;
      self.settings.disableCheckbox = !showCheckbox;
      return self;
    }

    function setFilter(showFilter) {
      showFilter = showFilter ? true : false;
      self.settings.disableFilter = !showFilter;
      return self;
    }

    function setReorder(showReorder) {
      showReorder = showReorder ? true : false;
      self.settings.disableReorder = !showReorder;
      return self;
    }

    function setPagination(showPagination) {
      showPagination = showPagination ? true : false;
      self.settings.disablePagination = !showPagination;
      return self;
    }

    function toJson() {
      return JSON.stringify(_settings);
    }
  }
}());
