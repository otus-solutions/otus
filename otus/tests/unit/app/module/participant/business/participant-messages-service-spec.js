describe('participant-messages-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  const SHOW_CLEAR_DIALOG_MESSAGE = 'Todos os campos disponíveis serão apagados! Deseja realmente realizar este procedimento?';
  const SHOW_SAVE_DIALOG_MESSAGE = 'Deseja salvar as alterações?';
  const ERROR_MESSAGE_WHEN_EMPTY = 'Ocorreu um problema na inserção de participante.';
  const ERROR_MESSAGE_WITH_NUMBER = 'Número de recrutamento 123 já existente.'

  beforeEach(function () {
    angular.mock.module('otusjs.participant.business');
  });

  beforeEach(function () {
    Mock.mdDialog = {
      confirm: function () {
        var self = this;

        self.title = function(){
          var vm = this;
          return vm;
        };
        self.textContent = function(msg){
          var vm = this;
          vm.msg = msg;
          return vm;
        };
        self.htmlContent = function(msg){
          var vm = this;
          vm.msg = msg;
          return vm;
        };
        self.ariaLabel = function(){
          var vm = this;
          return vm;
        };
        self.ok = function(){
          var vm = this;
          return vm;
        };
        self.cancel = function(){
          var vm = this;
          return vm;
        };
        return self;
      },
      alert: function () {
        var self = this;

        self.title = function(){
          var vm = this;
          return vm;
        };
        self.textContent = function(msg){
          var vm = this;
          vm.msg = msg;
          return vm;
        };
        self.htmlContent = function(msg){
          var vm = this;
          vm.msg = msg;
          return vm;
        };
        self.ariaLabel = function(){
          var vm = this;
          return vm;
        };
        self.ok = function(){
          var vm = this;
          return vm;
        };
        self.cancel = function(){
          var vm = this;
          return vm;
        };
        return self;
      },
      show: function (confirm) {
        var self = this;
        self.test = confirm;
        return Promise.resolve(self);
      }
    };

    Mock.mdToast = {
      show: function (confirm) {
        var self = this;
        self.test = confirm;
        return Promise.resolve(self);
      },
      simple: function () {
        var self = this;

        self.textContent = function(msg){
          var vm = this;
          vm.msg = msg;
          return vm;
        };

        self.position = function(p){
          var vm = this;
          vm.p = p;
          return vm;
        };

        self.hideDelay = function(time){
          var vm = this;
          vm.time = time;
          return vm;
        };

        return self;
      }
    };
    angular.mock.module(function ($provide) {
      $provide.value("$mdDialog", Mock.mdDialog);
      $provide.value("$mdToast", Mock.mdToast);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {

      service = _$injector_.get('otusjs.participant.business.ParticipantMessagesService');
    });
    mockMessages();
    spyOn(Mock.mdDialog, 'show').and.callThrough();
    spyOn(Mock.mdToast, 'show').and.callThrough();
  });

  it('should show a clear dialog with message', function (done) {
    service.showClearDialog();
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual(SHOW_CLEAR_DIALOG_MESSAGE);
      done();
    });
  });


  it('should show a save dialog with message', function (done) {
    service.showSaveDialog();
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual(SHOW_SAVE_DIALOG_MESSAGE);
      done();
    });
  });

  it('should show a not save dialog without message', function (done) {
    service.showNotSave("");
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual(ERROR_MESSAGE_WHEN_EMPTY);
      done();
    });
  });

  it('should show a not save dialog erro message without recruitment number', function (done) {
    service.showNotSave(Mock.errorMessage);
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual(Mock.errorMessage);
      done();
    });
  });

  it('should show a not save dialog erro message with recruitment number', function (done) {
    service.showNotSave(Mock.errorMessageWithRN);
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual(ERROR_MESSAGE_WITH_NUMBER);
      done();
    });
  });

  it('should show toast with message', function (done) {
    service.showToast(Mock.message);
    expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
    Mock.mdToast.show().then(function (result) {
      expect(result.simple().msg).toEqual(Mock.message);
      expect(result.simple().time).toEqual(3000);
      expect(result.simple().p).toEqual('right bottom');
      done();
    });
  });



  function mockMessages() {
    Mock.message = "Message";
    Mock.errorMessageWithRN = "Erro 123 participant";
    Mock.errorMessage = "Erro";
  }
});
