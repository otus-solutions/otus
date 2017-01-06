(function() {
  'use strict';

  angular
    .module('otusjs.application.locale')
    .config(Configuration);

  Configuration.$inject = ['$mdDateLocaleProvider']

  function Configuration($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
      return moment(date).format('DD/MM/YYYY');
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'DD/MM/YYYY', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
    };
  }

}());
