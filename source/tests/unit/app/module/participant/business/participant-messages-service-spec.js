describe('participant-messages-service Test', function() {
  var Mock = {};
  var service;
  var Injections = {};
  const SHOW_CLEAR_DIALOG_MESSAGE = 'Todos os campos disponíveis serão apagados! Deseja realmente realizar este procedimento?';
  const SHOW_SAVE_DIALOG_MESSAGE = 'Deseja salvar as alterações?';
  const ERROR_MESSAGE_WHEN_EMPTY = 'Ocorreu um problema na inserção de participante.';
  const ERROR_MESSAGE_WITH_NUMBER = 'Número de recrutamento 123 já existente.'

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
  });

  beforeEach(function () {
    Mock.DialogShowService = {
      showDialog: function (dialog) {
        var self = this;
        self.test = dialog;
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
      $provide.value('otusjs.application.dialog.DialogShowService', Mock.DialogShowService);
      $provide.value('$mdToast', Mock.mdToast);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {

      Injections = {
        $mdDialog: _$injector_.get('$mdDialog'),
        $mdToast: _$injector_.get('$mdToast'),
        DialogShowService: _$injector_.get('otusjs.application.dialog.DialogShowService')
      };

      service = _$injector_.get('otusjs.participant.business.ParticipantMessagesService',Injections);
    });
    mockMessages();
    spyOn(Injections.DialogShowService, 'showDialog').and.callThrough();
    spyOn(Injections.$mdToast, 'show').and.callThrough();
  });

  it('should show a clear dialog with message', function (done) {
    service.showClearDialog(SHOW_CLEAR_DIALOG_MESSAGE).then(function (result) {
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(SHOW_CLEAR_DIALOG_MESSAGE);
      done();
    });
  });

  it('should show a save dialog with message', function (done) {
    service.showSaveDialog(SHOW_SAVE_DIALOG_MESSAGE).then(function (result) {
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(SHOW_SAVE_DIALOG_MESSAGE);
      done();
    });
  });

  it('should show a not save dialog without message', function (done) {
    service.showNotSave(ERROR_MESSAGE_WHEN_EMPTY).then(function (result) {
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(ERROR_MESSAGE_WHEN_EMPTY);
      done();
    });
  });

  it('should show a not save dialog erro message without recruitment number', function (done) {
    service.showNotSave(Mock.errorMessage).then(function (result) {
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(Mock.errorMessage);
      done();
    });
  });

  it('should show a not save dialog erro message with recruitment number', function (done) {
    service.showNotSave(Mock.errorMessageWithRN).then(function (result) {
      expect(Injections.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(ERROR_MESSAGE_WITH_NUMBER);
      done();
    });
  });

  it('should show toast with message', function (done) {
    service.showToast(Mock.message);
    expect(Injections.$mdToast.show).toHaveBeenCalledTimes(1);
    Injections.$mdToast.show().then(function (result) {
      expect(result.simple().msg).toEqual(Mock.message);
      expect(result.simple().time).toEqual(4000);
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
