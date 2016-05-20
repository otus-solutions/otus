(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('InstallerResourceFactory', InstallerResourceFactory);

    InstallerResourceFactory.$inject = ['$resource'];

    function InstallerResourceFactory($resource) {
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
                    url: restPrefix + SUFFIX
                }
            });
        }

        return self;
    }

}());
