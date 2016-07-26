(function() {

    angular
        .module('otus')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', stateConfiguration])
        .constant('APP_STATE', {
            'HOME': 'home',
            'INSTALLER': 'installer',
            'LOGIN': 'login',
        });

    function stateConfiguration($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider
            .state('installer', {
                url: '/installer',
                resolve: {
                    onlyOneConfiguration: function(RouteRulesResolver) {
                        return RouteRulesResolver.onlyOneConfiguration();
                    }
                },
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
                resolve: {
                    initialConfiguration: function(RouteRulesResolver) {
                        return RouteRulesResolver.initialConfiguration();
                    },
                    alreadyLogged: function(RouteRulesResolver) {
                        return RouteRulesResolver.alreadyLogged();
                    }
                },
                views: {
                    'system-wrap': {
                        templateUrl: 'app/authenticator/login/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('home', {
                url: '/home',
                resolve: {
                    loggedUser: function(RouteRulesResolver) {
                        return RouteRulesResolver.loggedUser();
                    }
                },
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
            });

        /* Default state (route)
         * $locationProvider.html5Mode(true);*/
        $urlRouterProvider.otherwise('/login');

    }

}());
