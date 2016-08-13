(function() {

    angular
        .module('otus')
        .config(['$httpProvider', interceptorConfiguration]);

    function interceptorConfiguration($httpProvider) {
        $httpProvider.interceptors.push('otus.ResponseInterceptor');
    }

}());
