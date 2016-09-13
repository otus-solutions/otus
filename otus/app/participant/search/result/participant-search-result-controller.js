(function() {
    'use strict';

    angular
        .module('otus.participant.search')
        .controller('ParticipantSearchResultController', controller);

    controller.$inject = ['$scope', '$element', 'ParticipantSearchResultService'];

    function controller($scope, $element, ParticipantSearchResultService) {
        var self = this;
        var closeMessage = 'Visualizar Participantes';
        var openMessage = 'Fechar Lista';
        self.toggle = toggle;
        self.footer = {};
        self.get = get;

        _init();

        function _init() {
            var virtualRepeat = $element.find('.participant-search-result-container');
            ParticipantSearchResultService.registerElement(virtualRepeat);

            _buildOpenMessage();
        }

        function get() {
            return ParticipantSearchResultService.getFiltered();
        }

        function toggle() {
            var result = ParticipantSearchResultService.toggle();
            if (result) {
                _buildCloseMessage();
            } else {
                _buildOpenMessage();
            }
        }

        function _buildCloseMessage() {
            self.footer.message = closeMessage;
        }

        function _buildOpenMessage() {
            self.footer.message = openMessage;
        }
    }

}());
