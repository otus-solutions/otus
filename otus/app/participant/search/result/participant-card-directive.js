(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .directive('otusParticipantCard', otusParticipantCard);

    function otusParticipantCard() {
        var ddo = {
            templateUrl: 'app/participant/search/result/participant-card.html',
            retrict: 'E',
        };

        return ddo;
    }

}());
