(function() {
    'use strict';

    angular
        .module('otusjs.otus.participant.search')
        .directive('otusSearchToolbar', otusSearchToolbar);

    function otusSearchToolbar() {
        var ddo = {
            templateUrl: 'app/session/participant/search/toolbar/search-toolbar.html',
            retrict: 'E',
            controller: 'SearchToolbarController as searchToolbar'
        };

        return ddo;
    }

}());
