(function() {
    'use strict';

    angular
        .module('otus.installer')
        .controller('InitialConfigController', InitialConfigController);

    function InitialConfigController($scope) {
        var self = this;

        self.register = register;

        function register(project) {
            //post
        }
    }

})();
