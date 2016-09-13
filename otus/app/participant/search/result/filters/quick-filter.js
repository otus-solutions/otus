(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .filter('participantQuick', filter);

    function filter() {
        return function(itens, query) {
            return itens.filter(function(item) {
                return ((item.name.indexOf(query) !== -1) || (item.nr.toString().indexOf(query) !== -1));
            });
        };
    }
}());
