(function() {
    'use strict';

    angular
        .module('otusjs.otus.participant.search')
        .controller('SearchCustomController', SearchCustomController);

    SearchCustomController.$inject = ['$mdDialog'];

    // TODO Dummy Controller
    function SearchCustomController($mdDialog) {
        var self = this;
        self.close = close;
        self.participants = ['Joao', 'Fernando', 'Maria'];

        function close($event) {
            $mdDialog.cancel();
        }
    }
}());
