(function() {

    angular
        .module('otus', [
            'dependencies',
            'otus.dashboard',
            'otus.installer',
            'otus.authenticator',
            'otusjs.otus.singup',
            'otus.client',
            'otus.domain.client',
            'otus.participant.search',
        ]);
}());
