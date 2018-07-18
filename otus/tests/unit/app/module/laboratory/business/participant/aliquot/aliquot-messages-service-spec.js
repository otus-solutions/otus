describe('Aliquot Messages Service', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.laboratory.business.participant.aliquot');
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
    angular.mock.module(function ($provide) {
      $provide.value("$mdDialog", Mock.mdDialog);
      $provide.value("$mdToast", {});
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {

      service = _$injector_.get('otusjs.laboratory.business.participant.aliquot.AliquotMessagesService');
    });
    mockMessages();
    spyOn(Mock.mdDialog, 'show').and.callThrough();
  });

  it('should show a delete dialog with message', function (done) {
    service.showDeleteDialog("Message");
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual("Message");
      done();
    })
  });

  it('should show a delete dialog without message', function (done) {
    service.showDeleteDialog();
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual("A exclusão desta alíquota será um procedimento irreversível! Deseja realmente excluir?");
      done();
    })
  });

  it('should show a exit dialog with message', function (done) {
    service.showExitDialog("Message");
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual("Message");
      done();
    })
  });

  it('should show a exit dialog without message', function (done) {
    service.showExitDialog();
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual('Alíquotas alteradas serão descartadas.');
      done();
    })
  });

  it('should show a save dialog with message', function (done) {
    service.showSaveDialog("Message");
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual("Message");
      done();
    })
  });

  it('should show a save dialog without message', function (done) {
    service.showSaveDialog();
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    Mock.mdDialog.show().then(function (result) {
      expect(result.confirm().msg).toEqual('Deseja salvar as alterações?');
      done();
    })
  });

  it('should show a not removed dialog without content', function () {
    service.showNotRemovedDialog(Mock.msgOne);
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    expect(Mock.mdDialog.confirm().msg).toEqual(Mock.messageOne);
  });

  it('should show a not removed dialog in transportationLot content', function () {
    service.showNotRemovedDialog(Mock.msgTwo);
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    expect(Mock.mdDialog.confirm().msg).toEqual(Mock.messageTwo);
  });

  it('should show a not removed dialog in examLot content', function () {
    service.showNotRemovedDialog(Mock.msgThree);
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    expect(Mock.mdDialog.confirm().msg).toEqual(Mock.messageThree);
  });

  it('should show a not removed dialog in examResults content', function () {
    service.showNotRemovedDialog(Mock.msgFour);
    expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
    expect(Mock.mdDialog.confirm().msg).toEqual(Mock.messageFour);
  });

  function mockMessages() {
    Mock.msgOne = {};
    Mock.msgTwo = {
      "examLot": "300000015"
    };
    Mock.msgThree = {
      "examLot": "300000015",
      "transportationLot": "300000001"
    };
    Mock.msgFour = {
      "examLot": "300000015",
      "transportationLot": "300000001",
      "examResult": true
    };
    Mock.messageOne = '<br>A alíquota se encontra em: <br><br><ul></ul>';
    Mock.messageTwo = '<br>A alíquota se encontra em: <br><br><ul><li>Lote de Exames (300000015)</li></ul>';
    Mock.messageThree = '<br>A alíquota se encontra em: <br><br><ul><li>Lote de Transporte (300000001)</li><li>Lote de Exames (300000015)</li></ul>';
    Mock.messageFour = '<br>A alíquota se encontra em: <br><br><ul><li>Lote de Transporte (300000001)</li><li>Lote de Exames (300000015)</li><li>Existem Resultados com essa alíquota!</li></ul>';

  }
});
