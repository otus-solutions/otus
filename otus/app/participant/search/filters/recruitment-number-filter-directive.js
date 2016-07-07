(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .directive('otusRecruitmentNumberFilter', otusRecruitmentNumberFilter);

    function otusRecruitmentNumberFilter() {
        var ddo = {
            templateUrl: 'app/participant/search/filters/recruitment-number-filter.html',
            retrict: 'E'

        };

        return ddo;
    }

}());
