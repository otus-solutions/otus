describe('ParticipantContextService', function() {

  var UNIT_NAME = 'otusjs.otus.participant.context.ParticipantContextService';
  var service = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$injector_) {
      service = _$injector_.get(UNIT_NAME);
    });
  });

  describe('setPreList method', function() {

    it('should store a reference to a participant list to filter', function() {
      var participant = {};
      participant.name = 'Participant Name';

      service.setPreList([participant]);

      expect(service.getPreList()).toEqual([participant]);
    });

  });

  describe('selectParticipant method', function() {

    it('should store a reference to a participant', function() {
      var participant = {};
      participant.name = 'Participant Name';

      service.selectParticipant(participant);

      expect(service.getSelectedParticipant()).toEqual(participant);
    });

  });

});
