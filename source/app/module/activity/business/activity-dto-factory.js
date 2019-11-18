(function () {
    'use strict';

    angular
        .module('otusjs.activity.business')
        .factory('otusjs.activity.business.ActivityDtoFactory', Factory);

    Factory.$inject = [];

    function Factory() {
        var self = this;
        self.create = create;

        function create(survey, configuration, mode){
            let activityDto = new ActivityDto(survey, configuration, mode);
            return activityDto;
        }

        return self;
    }

    function ActivityDto(survey, configuration, mode) {
        let self = this;
        self.OBJECT_TYPE = 'ActivityDto';
        self.surveyForm = survey;
        self.configuration = configuration;
        self.mode = mode;
    }



})();