describe('otusDashboard', function() {

  var UNIT_NAME = 'otusDashboard';
  var injections = {};
  var bindings = {};
  var componentController = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_, _$injector_) {
      componentController = _$componentController_(UNIT_NAME, bindings, injections);
    });
  });

  describe('selectParticipant method', function() {

    it('should store a reference to selected participant passed by parameter', function() {
      var participant = {};
      participant.name = 'Participant Name';

      componentController.selectParticipant(participant)

      expect(componentController.selectedParticipant).toEqual(participant);
    });

  });

  describe('$onInit method', function() {

    it('should set a null value to selectedParticipant attribute', function() {
      componentController.$onInit();

      expect(componentController.selectedParticipant).toEqual(null);
    });

  });

});
