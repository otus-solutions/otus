(function() {
    'use strict';

    angular
        .module('otusClient')
        .service('RestResourceService', RestResourceService);

    function RestResourceService.$inject = ['UrlResourceFactory'];

    function RestResourceService(UrlResourceFactory) {
        var HOSTNAME = 'http://' + window.location.hostname;
        var CONTEXT = '/otus-rest';
        var VERSION = '/v01';
        //OTUS-REST? V01?

        var self = this;
        self.getUrlResource = getUrlResource;

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

        function getUrlResource() {
            var prefix = getRestPrefix();
            return UrlResourceFactory.create(prefix);
        }
    }
}());
