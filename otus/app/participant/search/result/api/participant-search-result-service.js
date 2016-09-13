(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .service('ParticipantSearchResultService', service);

    service.$inject = ['$q', '$http', '$filter'];

    function service($q, $http, $filter) {
        var filteredParticipants = [];
        var participants = [];
        var filters = {};

        var self = this;
        self.registerElement = registerElement;
        self.getFiltered = getFiltered;
        self.applyFilters = applyFilters;
        self.addFilter = addFilter;
        self.hasClose = hasClose;
        self.toggle = toggle;
        self.get = get;

        _init();

        function _init(){
            // TODO Data Dummy
            $http.get('app/assets/static-resources/participants_dummy.json').success(function(data) {
                participants = data;
                filteredParticipants = data;
            });
        }

        function toggle(){
            self.$resultPanel.toggleClass('hide');
            return hasClose();
        }

        function hasClose(){
            return self.$resultPanel.hasClass('hide');
        }

        function registerElement($resultPanel){
            self.$resultPanel = $resultPanel;
        }

        function get() {
            return participants;
        }

        function getFiltered(){
            return filteredParticipants;
        }

        function addFilter(filter){
            filters = filter;
        }

        function applyFilters(){
            var result = participants;

            Object.keys(filters).forEach(function(element, index, array){
                result = $filter(element)(result, filters[element]);
            });

            filteredParticipants = result;
        }
    }

}());
