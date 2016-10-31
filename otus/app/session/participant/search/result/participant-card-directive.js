(function() {
    'use strict';

    angular
        .module('otusjs.otus.participant.search')
        .directive('otusParticipantCard', otusParticipantCard);

    function otusParticipantCard() {
        var ddo = {
            templateUrl: 'app/session/participant/search/result/participant-card.html',
            retrict: 'E',
        };

        return ddo;
    }

}());
