(function() {
    'use strict';

    angular
        .module('otusjs.otus.participant.search')
        .directive('otusNameFilter', otusNameFilter);

    function otusNameFilter() {
        var ddo = {
            templateUrl: 'app/session/participant/search/filters/name-filter.html',
            retrict: 'E'

        };

        return ddo;
    }

}());
