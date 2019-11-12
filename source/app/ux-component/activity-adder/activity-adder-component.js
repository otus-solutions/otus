(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusActivityAdder', {
            controller: Controller,
            templateUrl: 'app/ux-component/activity-adder/activity-adder-template.html'
        });

    Controller.$inject = [
        'otusjs.activity.business.ParticipantActivityService',
        'otusjs.application.state.ApplicationStateService',
        '$mdDialog',
        'otusjs.application.dialog.DialogShowService',
        'otusjs.deploy.LoadingScreenService',
        '$q',
        '$timeout'
    ];

    function Controller(ParticipantActivityService, ApplicationStateService, $mdDialog, DialogService, LoadingScreenService, $q, $timeout) {
        var self = this;
        // var _selectedActivities = [];
        var _exitDialog;
        self.activities = [];

        self.selectedActivities = [];
        self.statePreview = false;
        self.mode = "ONLINE";
        self.selectType = "activityUnit";
        self.iconMode = "";
        self.configuration = {};


        /* Public methods */
        //self.addActivities = addActivities;
        //self.catchActivity = catchActivity;

        self.addActivity = addActivity;
        self.querySearch = querySearch;
        self.getIconModeState = getIconModeState;
        self.$onInit = onInit;

        // self.selectedItemChange = function (item) {
        //   console.log(item);
        //   console.log(self.selectedItem);
        // }

        function onInit() {
            _exitDialog = {
                dialogToTitle: 'Alerta',
                titleToText: 'ATENÇÃO!',
                textDialog: 'Você deve selecionar ao menos uma atividade.',
                ariaLabel: 'Alerta de Erro',
                buttons: [
                    {
                        message: 'Fechar',
                        action: function () {
                            $mdDialog.hide()
                        },
                        class: 'md-raised md-no-focus'
                    }
                ]
            };
            LoadingScreenService.start();
            _loadCategories();
            _loadActivities();
        }

        // function addActivities() {
        //     if (_selectedActivities.length > 0) {
        //         _selectedActivities = [];
        //         ApplicationStateService.activateActivityCategories();
        //     } else {
        //         DialogService.showDialog(_exitDialog);
        //     }
        // }

        // function addActivities() {
        //     if (_selectedActivities.length > 0) {
        //         self.selectedActivities = [];
        //         ApplicationStateService.activateActivityCategories();
        //     } else {
        //         DialogService.showDialog(_exitDialog);
        //     }
        // }

        // function catchActivity(activity) {
        //     var activityIndex = _selectedActivities.indexOf(activity.acronym);
        //     if (activityIndex !== -1) {
        //         _selectedActivities.splice(activityIndex, 1);
        //         window.sessionStorage.setItem('selectedActivities', JSON.stringify(_selectedActivities));
        //     } else {
        //         _selectedActivities.push(activity.acronym);
        //         window.sessionStorage.setItem('selectedActivities', JSON.stringify(_selectedActivities));
        //     }
        // }


        // function catchActivity(activity) {
        //     var activityIndex = self.selectedActivities.indexOf(activity.acronym);
        //     console.log(activity);
        //     if (activityIndex !== -1) {
        //         self.selectedActivities.splice(activityIndex, 1);
        //         window.sessionStorage.setItem('selectedActivities', JSON.stringify(self.selectedActivities));
        //     } else {
        //         self.selectedActivities.push(activity.acronym);
        //         window.sessionStorage.setItem('selectedActivities', JSON.stringify(self.selectedActivities));
        //     }
        //     console.log(self.selectedActivities)
        // }

        function addActivity(survey) {
            if (survey && self.mode === 'ONLINE') {
                ParticipantActivityService.createActivity(survey, self.configuration)
                    .then(result => {
                        self.selectedActivities.push(result.surveyActivity);
                    });
            }
            if (survey && self.mode === 'PAPER') {
                self.selectedActivities.push(_mountActivityPreview(survey));
            }

            self.statePreview = true;
        }

        function getIconModeState(activity){
            return activity.mode === "ONLINE" ?  "assessment": "description"
        }


        function _loadCategories() {
            ParticipantActivityService
                .listAllCategories()
                .then(function (response) {
                    self.categories = response;
                });
        }

        function _loadActivities() {
            ParticipantActivityService.listAvailables()
                .then(function (activities) {
                    self.activities = angular.copy(activities);
                    self.AllActivities = angular.copy(self.activities);
                    if (activities.length) {
                        self.isListEmpty = false;
                    }
                }).then(LoadingScreenService.finish());
        }

        function querySearch(query) {
            var results = query ? self.activities.filter(_createFilterFor(query)) : self.activities;
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);

            return deferred.promise;
        }

        function _createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(activity) {
                return activity.name.toLowerCase().indexOf(lowercaseQuery) > -1 ||
                    activity.acronym.toLowerCase().indexOf(lowercaseQuery) > -1;
            };
        }


    }
}());
