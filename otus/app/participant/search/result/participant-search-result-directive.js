(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .directive('otusParticipantSearchResult', directive);

    function directive() {
        var ddo = {
            templateUrl: 'app/participant/search/result/participant-search-result-template.html',
            retrict: 'E',
            controller: 'ParticipantSearchResultController as controller'
        };

        return ddo;
    }

}());
