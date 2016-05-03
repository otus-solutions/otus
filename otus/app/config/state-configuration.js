
(function() {

    angular
        .module('otus')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'LOGIN': 'login',
        });

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    'system-wrap' : {
                        templateUrl: 'app/authenticator/login.html',
                    }
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'system-wrap' : {
                        templateUrl: 'app/home/main-home-content-template.html',
                    },
                }
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode(true);
    }

}());
