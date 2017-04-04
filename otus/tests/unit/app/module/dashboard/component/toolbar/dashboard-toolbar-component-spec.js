xdescribe('otusDashboardToolbar', function() {

  var UNIT_NAME = 'otusDashboardToolbar';
  var componentController = {};
  var Injections = {};
  var Bindings = {};

  beforeEach(function() {
    module('otusjs.otus');

    inject(function(_$componentController_) {
      mockBindings();
      componentController = _$componentController_(UNIT_NAME, Injections, Bindings);
    });
  });

  describe('selectParticipant method', function() {

    var participant = {};
    var onParticipantSelectData = {};

    beforeEach(function() {
      onParticipantSelectData.participant = participant;
    });

    it('should invoke onParticipantSelect output', function() {
      componentController.selectParticipant(participant);

      expect(componentController.onParticipantSelect).toHaveBeenCalledWith(onParticipantSelectData);
    });

  });

  function mockBindings() {
    Bindings.onParticipantSelect = jasmine.createSpy();
  }

});
