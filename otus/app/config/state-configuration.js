(function() {

    angular
        .module('otus')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'INSTALLER': 'installer',
            'LOGIN': 'login',
            'SIGNUP': 'signup',
            'SIGNUP_RESULT': 'signup-result',
        });

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('installer', {
                url: '/installer',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/installer/initial/initial-config.html',
                        controller: 'InitialConfigController',
                        controllerAs: 'controller'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/authenticator/login/login.html',
                        controller: 'LoginController as $ctrl'
                    }
                }
            })
            .state('home', {
                url: '/home',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/dashboard/home/main-home-content-template.html'
                    },
                    'dashboard-menu@home': {
                        templateUrl: 'app/dashboard/menu/dashboard-menu.html',
                        controller: 'OtusDashboardMenu',
                        controllerAs: 'dashboardMenu'
                    }
                }
            })
            .state('signup', {
                url: '/signup',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/user/signup/signup.html',
                        controller: 'SignupController as $ctrl'
                    }
                }
            })
            .state('signup-result', {
                url: '/signup-result',
                views: {
                    'system-wrap': {
                        templateUrl: 'app/user/signup/signup-result.html',
                        controller: 'SignupController as $ctrl'
                    }
                }
            });

        /* Default state (route) */
        $urlRouterProvider.otherwise('/login');
        $locationProvider.html5Mode(true);
    }

}());
