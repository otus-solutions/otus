(function() {
    'use strict';

    angular
        .module('otusjs.otus.participant.search')
        .directive('otusRecruitmentNumberFilter', otusRecruitmentNumberFilter);

    function otusRecruitmentNumberFilter() {
        var ddo = {
            templateUrl: 'app/session/participant/search/filters/recruitment-number-filter.html',
            retrict: 'E'

        };

        return ddo;
    }

}());
