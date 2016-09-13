(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .controller('SearchCustomController', SearchCustomController);

    SearchCustomController.$inject = ['$mdDialog', '$http'];

    function SearchCustomController($mdDialog, $http) {
        var self = this;
        self.close = close;

        function close($event) {
            $mdDialog.cancel();
        }

    }
}());
