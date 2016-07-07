(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .directive('otusBirthdateFilter', otusBirthdateFilter);

    function otusBirthdateFilter() {
        var ddo = {
            templateUrl: 'app/participant/search/filters/birthdate-filter.html',
            retrict: 'E'

        };

        return ddo;
    }

}());
