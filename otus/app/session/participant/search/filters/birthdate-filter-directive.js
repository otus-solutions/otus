(function() {
    'use strict';

    angular
        .module('otusjs.otus.participant.search')
        .directive('otusBirthdateFilter', otusBirthdateFilter);

    function otusBirthdateFilter() {
        var ddo = {
            templateUrl: 'app/session/participant/search/filters/birthdate-filter.html',
            retrict: 'E'

        };

        return ddo;
    }

}());
