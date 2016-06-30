(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .directive('otusNameFilter', otusNameFilter);

    function otusNameFilter() {
        var ddo = {
            templateUrl: 'app/participant/search/filters/name-filter.html',
            retrict: 'E'

        };

        return ddo;
    }

}());
