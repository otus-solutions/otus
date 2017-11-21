(function () {
    'use strict';

    angular
        .module('otusjs.deploy')
        .service('otusjs.deploy.ActivityConfigurationRestService', Service);

    Service.$inject = [
        '$q',
        'OtusRestResourceService'
    ];

    function Service($q, OtusRestResourceService) {
        var self = this;
        var _rest = null;

        /* Public methods */
        self.initialize = initialize;
        self.update = update;
        self.list = list;
        self.save = save;
        self.remove = remove;
        self.setDefault = setDefault;

        function initialize() {
            _rest = OtusRestResourceService.getActivityConfigurationResource();
        }

        function update(data) {
            if (!_rest) {
                throw new Error('REST resource is not initialized.');
            }
            return _rest.update(data).$promise;
        }

        function save(data) {
            if (!_rest) {
                throw new Error('REST resource is not initialized.');
            }
            return _rest.create(data).$promise;
        }

        function list() {
            if (!_rest) {
                throw new Error('REST resource is not initialized.');
            }

            var request = $q.defer();

            _rest
                .listAll()
                .$promise
                .then(function (response) {
                    if (response.data && response.data.length) {
                        request.resolve(response.data);
                    } else {
                        request.resolve([]);
                    }
                });

            return request.promise;
        }

        function remove(data) {
            if (!_rest) {
                throw new Error('REST resource is not initialized.');
            }
            return _rest.delete({id: data.name}).$promise;
        }

        function setDefault(data) {
            if (!_rest) {
                throw new Error('REST resource is not initialized.');
            }
            return _rest.setDefault({ id: data.name }).$promise;
        }
    }
}());
