(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('RestResourceService', RestResourceService);

    RestResourceService.$inject = ['InstallerResourceFactory'];

    function RestResourceService(InstallerResourceFactory) {
        var HOSTNAME = 'http://' + window.location.hostname;
        var CONTEXT = '/otus-rest';
        var VERSION = '/v01';


        var self = this;
        self.getInstallerResource = getInstallerResource;

        function getRestPrefix() {
            return HOSTNAME + CONTEXT + VERSION;
        }

        function getHostName() {
            return HOSTNAME;
        }

        function getContext() {
            return CONTEXT;
        }

        function getVersion() {
            return VERSION;
        }

        function getInstallerResource() {
            var prefix = getRestPrefix();
            return InstallerResourceFactory.create(prefix);
        }
    }

}());
