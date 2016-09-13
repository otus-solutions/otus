(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .controller('SearchToolbarController', SearchToolbarController);

    SearchToolbarController.$inject = ['$mdDialog', 'ParticipantSearchResultService'];

    function SearchToolbarController($mdDialog, ParticipantSearchResultService) {
        var self = this;
        self.openCustomSearch = openCustomSearch;
        self.quickFilter = quickFilter;
        self.selectSearch = selectSearch;

        function quickFilter(query) {
            ParticipantSearchResultService.addFilter({
                'participantQuick': query
            });
            ParticipantSearchResultService.applyFilters();
        }

        function selectSearch() {
            if (ParticipantSearchResultService.hasClose()) {
                ParticipantSearchResultService.toggle();
            }
        }

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
