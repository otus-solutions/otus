(function() {

    angular
        .module('otus', [
            'dependencies',
            'otus.dashboard',
            'otus.installer',
            'otus.authenticator',
            'otus.client'
        ]);
}());
