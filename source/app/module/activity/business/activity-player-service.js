(function () {
  'use strict';

  angular
    .module('otusjs.activity.business')
    .service('otusjs.activity.business.ActivityPlayerService', Service);

  Service.$inject = [
    'otusjs.activity.business.ParticipantActivityService',
    'otusjs.activity.core.ModuleService',
    'otusjs.activity.core.ContextService',
    '$cookies'
  ];

  function Service(ParticipantActivityService, ModuleService, ContextService, $cookies) {
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
      var token = sessionStorage.getItem("outk");
      var url = $cookies.get('Player-Address');
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
      location.href = _getUrlPreviewPlayer(id);
    }
  }
}());
