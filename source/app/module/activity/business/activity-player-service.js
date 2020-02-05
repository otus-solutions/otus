(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivityPlayerService', Service);

  Service.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService',
    'otusjs.application.session.core.ContextService',
    '$cookies',
    '$window'
  ];

  function Service(ParticipantActivityService, ModuleService, ContextService, ContextUserService, $cookies, $window) {
    var self = this;

    var activityToPlay = null;

    /* Public methods */
    self.load = load;

    function load() {
      activityToPlay = null;
      var _activity = ContextService.getSelectedActivities()[0];
      _runSurveyPlayer(_activity.getID());
    }

    function _getUrlPreviewPlayer(id) {
      var callback = location.href;
      var token = ContextUserService.getToken();
      var url = $cookies.get('Player-Address');
      if (!url) return $window.location.href;
      if (_isValidUrl(url)){
        return url.concat("?activity=").concat(id).concat('&').concat('token=').concat(token).concat('&').concat('callback=').concat(callback);
      } else {
        return url.concat('/').concat("?activity=").concat(id).concat('&').concat('token=').concat(token).concat('&').concat('callback=').concat(callback);
      }
    }

    function _isValidUrl(url) {
      const regex = new RegExp(/\/$/g);
      return regex.test(url);
    }

    function _runSurveyPlayer(id) {
      $window.location.href = _getUrlPreviewPlayer(id);
    }
  }
}());
