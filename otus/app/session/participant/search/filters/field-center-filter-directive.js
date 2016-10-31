(function() {
    'use strict';

    angular
        .module('otusjs.otus.participant.search')
        .directive('otusFieldCenterFilter', otusFieldCenterFilter);

    function otusFieldCenterFilter() {
        var ddo = {
            templateUrl: 'app/session/participant/search/filters/field-center-filter.html',
            retrict: 'E'

        };

        return ddo;
    }

}());
