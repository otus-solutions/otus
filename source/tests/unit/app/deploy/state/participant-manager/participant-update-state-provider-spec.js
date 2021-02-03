describe('ParticipantUpdateState', function () {

  var UNIT_NAME = 'otusjs.deploy.ParticipantUpdateState';
  var URL = '/participant-update';
  var TEMPLATE_URL = '<otus-participant-contact permissions="$resolve.permission"></otus-participant-contact>';
  var provider = {};
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusjs.otus');
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      Injections.STATE = _$injector_.get('STATE');
      provider = _$injector_.get(UNIT_NAME, Injections);
    });
  });

  describe('state definition', function () {

    it('name should be equal to expected', function () {
      expect(provider.state.name).toEqual(Injections.STATE.PARTICIPANT_UPDATE);
    });

    it('url should be equal to expected', function () {
      expect(provider.state.url).toEqual(URL);
    });

    xit('templateUrl should be equal to expected', function () {
      expect(provider.state.template).toEqual(TEMPLATE_URL);
    });

  });

});
