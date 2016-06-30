(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .controller('SearchToolbarController', SearchToolbarController);

    SearchToolbarController.$inject = ['$mdDialog'];

    function SearchToolbarController($mdDialog) {
        var self = this;
        self.openCustomSearch = openCustomSearch;

        function openCustomSearch($event) {
            $mdDialog.show({
                controller: 'SearchCustomController',
                controllerAs: 'searchCustom',
                templateUrl: 'app/participant/search/dialog/search-custom-dialog.html',
                targetEvent: $event,
                clickOutsideToClose: true
            });
        }
    }

}());
