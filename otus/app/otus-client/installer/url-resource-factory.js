(function() {
    'use strict';

    angular
        .module('otusClient')
        .factory('UrlResourceFactory', UrlResourceFactory);

    UrlResourceFactory.$inject = ['$resource'];

    function UrlResourceFactory($resource) {
        var SUFFIX = '/url';

        var self = this;
        self.create = create;

        function create(restPrefix) {
            return $resource({}, {}, {
                ready: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/url'
                }
            });
        }

        return self;
    }

}());
