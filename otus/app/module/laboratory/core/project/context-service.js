(function () {
  'use strict';

  angular
    .module('otusjs.laboratory.core')
    .service('otusjs.laboratory.core.project.ContextService', Service);

  Service.$inject = [
    '$q',
    'otusjs.laboratory.storage.LaboratoryLocalStorageService'
  ];

  function Service($q, LaboratoryLocalStorageService) {
    var self = this;
    var _context = null;
    var _storage = null;

    var LABORATORY_CONTEXT = 'project_context';

    /* Public methods */
    self.begin = begin;
    self.restore = restore;
    self.end = end;
    self.isValid = isValid;
    self.hasContextActive = hasContextActive;
    self.save = save;

    self.configureContext = configureContext;
    self.configureStorage = configureStorage;

    self.getData = getData;
    self.setData = setData;
    self.removeData = removeData;

    self.setStateToGo = setStateToGo;
    self.getStateToGo = getStateToGo;
    self.setFileStructure = setFileStructure;
    self.getFileStructure = getFileStructure;
    self.setFieldCenterInSendingExam = setFieldCenterInSendingExam;
    self.getFieldCenterInSendingExam = getFieldCenterInSendingExam;
    self.setExamSendingAction = setExamSendingAction;
    self.getExamSendingAction = getExamSendingAction;
    self.clearFileStructure = clearFileStructure;

    function begin() {
      _context.clear();
      save();
    }

    function restore() {
      _restoreContextData();
    }

    function end() {
      _storage.removeItem(LABORATORY_CONTEXT);
    }


    function isValid() {
      _testInternalState();
      if (!hasContextActive()) {
        throw new Error('There is no a Project context.', 'laboratory/project/context-service.js', 57);
      }
    }

    function hasContextActive() {
      return _storage.getItem(LABORATORY_CONTEXT) ? true : false;
    }

    function save() {
      _testInternalState();
      _storage.setItem(LABORATORY_CONTEXT, _context.toJson());
    }

    //--------------------------------------------------------------------------------------------
    // Context methods
    //--------------------------------------------------------------------------------------------
    function getData(dataKey) {
      _testInternalState();
      //return _context.getData(dataKey);
    }

    function setData(dataKey, dataValue) {
      _testInternalState();
      _context.setData(dataKey, dataValue);
      save();
    }

    function removeData(dataKey) {
      _testInternalState();
      _context.removeData(dataKey);
      save();
    }

    //--------------------------------------------------------------------------------------------
    // Methods for application integration
    //--------------------------------------------------------------------------------------------
    function configureContext(contextFactory) {
      _context = contextFactory.create(LABORATORY_CONTEXT);
    }

    function configureStorage(storage) {
      _storage = storage;
    }

    //--------------------------------------------------------------------------------------------
    // Internal context methods
    //--------------------------------------------------------------------------------------------
    function _restoreContextData() {
      isValid();
      _context.fromJson(_storage.getItem(LABORATORY_CONTEXT));
    }

    function _testInternalState() {
      if (!_context) {
        throw new Error('Internal context is not initialized.', 'context-service.js', 111);
      }
      if (!_storage) {
        throw new Error('Internal storage is not initialized.', 'context-service.js', 114);
      }
    }

    //--------------------------------------------------------------------------------------------
    // Custom context methods
    //--------------------------------------------------------------------------------------------
    function setStateToGo(state) {
      setData('stateToGo', state);
    }

    function getStateToGo() {
      return getData('stateToGo');
    }

    function setFileStructure(file) {
      LaboratoryLocalStorageService.clear();
      LaboratoryLocalStorageService.insert(file);
      setData('fileStructureAddress', file.$loki);
    }

    function getFileStructure() {
      var index =  getData('fileStructureAddress');
      return LaboratoryLocalStorageService.get(index);

    }

    function setFieldCenterInSendingExam(center) {
      setData('FieldCenterInSendingExam', center);
    }

    function getFieldCenterInSendingExam() {
      return getData('FieldCenterInSendingExam');
    }

    function setExamSendingAction(action) {
      setData('ExamSendingAction', action);
    }

    function getExamSendingAction() {
      return getData('ExamSendingAction');
    }

    function clearFileStructure() {
      removeData('fileStructure');
    }
  }
}());
