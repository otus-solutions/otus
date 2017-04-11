describe('LoadingScreenService', function() {

  var UNIT_NAME = 'otusjs.deploy.LoadingScreenService';
  var service = {};

  var MESSAGE = 'Por favor, aguarde o carregamento.';
  var MESSAGE_LOAD = 'Carregando os dados.';

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {

      service = _$injector_.get(UNIT_NAME);
    });
  });

  describe('$onInit method', function() {

    it('should called method changeMessage', function() {
      spyOn(service, "changeMessage");

      service.$onInit();

      expect(service.changeMessage).toHaveBeenCalled();
    });

  });

  describe('changeMessage method', function() {

    it('should set message default', function() {
      service.changeMessage();

      expect(service.message).toBe(MESSAGE);
    });

    it('should set message with label passed by parameter ', function() {
      service.changeMessage(MESSAGE_LOAD);

      expect(service.message).toBe(MESSAGE_LOAD);
    });

  });

});
