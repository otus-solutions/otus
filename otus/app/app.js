(function() {

    angular
        .module('otus', [
            'dependencies',
            'otus.dashboard',
            'otus.installer',
            'otus.authenticator',
            'otusjs.otus.singup',
            'otus.client',
            'otusDomainClient',
            'otus.dashboard',
            'otus.participant.search'
        ]);
}());
