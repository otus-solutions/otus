(function() {

    angular
        .module('otus')
        .run(['OtusRestResourceService', '$window', initConfiguration]);

    function initConfiguration(OtusRestResourceService, $window) {
        var __env = $window.__env;
        OtusRestResourceService.setUrl(__env.apiUrl);
    }

}());
