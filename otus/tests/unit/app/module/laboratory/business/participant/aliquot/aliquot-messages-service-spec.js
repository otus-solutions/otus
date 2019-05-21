describe('Aliquot Messages Service', function () {
  var Mock = {};
  var service;

  beforeEach(function () {
    angular.mock.module('otusjs.laboratory.business');
  });

  beforeEach(function ($rootScope) {
    Mock.DialogShowService = {
      showDialog: function (dialog) {
        var self = this;
        self.test = dialog;
        return Promise.resolve(self);
      }
    };
    Mock.$scope = new $rootScope();

    angular.mock.module(function ($provide) {
      $provide.value('otusjs.application.dialog.DialogShowService', Mock.DialogShowService);
      $provide.value('$mdDialog', {});
      $provide.value('$mdToast', {});
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      service = _$injector_.get('otusjs.laboratory.business.participant.aliquot.AliquotMessagesService');
    });

    mockMessages();
    spyOn(Mock.DialogShowService, 'showDialog').and.callThrough();
  });

  it('should show a delete dialog with message', function (done) {
    service.showDeleteDialog("Message").then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual("Message");
      done();
    })
  });

  it('should show a delete dialog without message', function (done) {
    service.showDeleteDialog().then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual("A exclusão desta alíquota será um procedimento irreversível! Deseja realmente excluir?");
      done();
    })
  });

  it('should show a exit dialog with message', function (done) {
    service.showExitDialog("Message").then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual("Message");
      done();
    })
  });

  it('should show a exit dialog without message', function (done) {
    service.showExitDialog().then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual('Alíquotas alteradas serão descartadas.');
      done();
    })
  });

  it('should show a save dialog with message', function (done) {
    service.showSaveDialog("Message").then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual("Message");
      done();
    })
  });

  it('should show a save dialog without message', function (done) {
    service.showSaveDialog().then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual('Deseja salvar as alterações?');
      done();
    })
  });

  it('should show a not removed dialog without content', function () {
    service.showNotRemovedDialog(Mock.msgOne).then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(Mock.messageOne);
    })
  });

  it('should show a not removed dialog in transportationLot content', function () {
    service.showNotRemovedDialog(Mock.msgTwo).then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(Mock.messageTwo);
    })
  });

  it('should show a not removed dialog in examLot content', function () {
    service.showNotRemovedDialog(Mock.msgThree).then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(Mock.messageThree);
    })
  });

  it('should show a not removed dialog in examResults content', function () {
    service.showNotRemovedDialog(Mock.msgFour).then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(Mock.messageFour);
    })
  });

  it('should show a convert dialog without message', function (done) {
    service.showConvertDialog(Mock.msgOne,Mock.$scope.dialogForm).then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual("Deseja salvar as alterações?");
      done();
    })
  });

  it('should show a not converted dialog without message', function (done) {
    service.showNotConvertedDialog(Mock.msgFour).then(function (result) {
      expect(Mock.DialogShowService.showDialog).toHaveBeenCalledTimes(1);
      expect(result.test.textDialog).toEqual(Mock.messageFour);
      done();
    })
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
    Mock.messageOne = '<p>A alíquota se encontra em: </p><br><dl></dl><br><br><b>Para esse procedimento é necessário a remoção da aliquota do(s) ambiente(s) acima.</b>';
    Mock.messageTwo = '<p>A alíquota se encontra em: </p><br><dl><li>Lote de Exames (Código do lote: 300000015)</li></dl><br><br><b>Para esse procedimento é necessário a remoção da aliquota do(s) ambiente(s) acima.</b>';
    Mock.messageThree = '<p>A alíquota se encontra em: </p><br><dl><li>Lote de Transporte (Código do lote: 300000001)</li><li>Lote de Exames (Código do lote: 300000015)</li></dl><br><br><b>Para esse procedimento é necessário a remoção da aliquota do(s) ambiente(s) acima.</b>';
    Mock.messageFour = '<p>A alíquota se encontra em: </p><br><dl><li>Lote de Transporte (Código do lote: 300000001)</li><li>Lote de Exames (Código do lote: 300000015)</li><li>Existem Resultados com essa alíquota!</li></dl><br><br><b>Para esse procedimento é necessário a remoção da aliquota do(s) ambiente(s) acima.</b>';
  }
});
