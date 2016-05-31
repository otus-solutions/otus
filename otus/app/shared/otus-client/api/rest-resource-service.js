(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('OtusRestResourceService', OtusRestResourceService);

    OtusRestResourceService.$inject = ['OtusInstallerResourceFactory'];

    function OtusRestResourceService(OtusInstallerResourceFactory) {
        var HOSTNAME = 'http://' + window.location.hostname;
        var CONTEXT = '/otus-rest';
        var VERSION = '/v01';


        var self = this;
        self.getOtusInstallerResource = getOtusInstallerResource;

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

        function getOtusInstallerResource() {
            var prefix = getRestPrefix();
            return OtusInstallerResourceFactory.create(prefix);
        }
    }

}());
