(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusInstallerResourceFactory', OtusInstallerResourceFactory);

    OtusInstallerResourceFactory.$inject = ['$resource'];

    function OtusInstallerResourceFactory($resource) {
        var SUFFIX = '/installer';

        var self = this;
        self.create = create;

        function create(restPrefix) {
            return $resource({}, {}, {
                ready: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/ready'
                },
                config: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/config'
                }
            });
        }

        return self;
    }

}());
