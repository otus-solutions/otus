(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .directive('otusSearchToolbar', otusSearchToolbar);

    function otusSearchToolbar() {
        var ddo = {
            templateUrl: 'app/participant/search/toolbar/search-toolbar.html',
            retrict: 'E',
            controller: 'SearchToolbarController as searchToolbar'
        };

        return ddo;
    }

}());
