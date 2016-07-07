(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .directive('otusFieldCenterFilter', otusFieldCenterFilter);

    function otusFieldCenterFilter() {
        var ddo = {
            templateUrl: 'app/participant/search/filters/field-center-filter.html',
            retrict: 'E'

        };

        return ddo;
    }

}());
