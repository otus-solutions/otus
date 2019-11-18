(function () {
    'use strict';

    angular
        .module('otusjs.otus.uxComponent')
        .component('otusActivityAdder', {
            controller: Controller,
            templateUrl: 'app/ux-component/activity-adder/activity-adder-template.html',
            bindings: {
                checkers: '<'
            }
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
        self.surveys = [];

        //self.selectedActivities = [];
        self.statePreview = false;
        self.mode = "ONLINE";
        self.selectType = "activityUnit";
        self.iconMode = "";
        self.configuration = {};

        self.activityDtos = [];


        /* Public methods */
        //self.addActivities = addActivities;
        //self.catchActivity = catchActivity;

        self.addActivity = addActivity;
        self.addActivityDtos = addActivityDtos;
        self.saveActivities = saveActivities;
        self.surveyQuerySearch = surveyQuerySearch;
        //self.checkerQuerySearch = checkerQuerySearch;

        self.getModeIcon = getModeIcon;  //getModeIcon
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
            _loadActivityDtosfromStorage();
            _loadCategories();
            _loadSurveys();
            //self.paperActivityData = {};
            //self.paperActivityData.realizationDate = new Date();
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

        function addActivityDtos(survey){
            let dto = ParticipantActivityService.createActivityDto(survey, self.configuration, self.mode);
            self.activityDtos.push(dto);
            window.sessionStorage.setItem('activityDtos', JSON.stringify(self.activityDtos));
        }

        function saveActivities(){
            ParticipantActivityService.saveActivities(self.activityDtos);
        }

        function addActivity(survey) {
            // if (survey && self.mode === 'ONLINE') {
                ParticipantActivityService.createActivity(survey, self.configuration)
                    .then(result => {
                        result.surveyActivity.mode = self.mode;
                        console.log(result.surveyActivity)
                        self.selectedActivities.push(result.surveyActivity);
                    });
            // }
            // if (survey && self.mode === 'PAPER') {
            //     self.selectedActivities.push(_mountActivityPreview(survey));
            // }

            self.statePreview = true;
        }

        function getModeIcon(activity){
            return activity.mode === "ONLINE" ?  "signal": "file-document"
        }


        function _loadCategories() {
            ParticipantActivityService
                .listAllCategories()
                .then(function (response) {
                    self.categories = response;
                });
        }

        function _loadSurveys() {
            ParticipantActivityService.listAvailables()
                .then(function (surveys) {
                    self.surveys = angular.copy(surveys);
                    self.AllSurveys = angular.copy(self.surveys);
                    if (surveys.length) {
                        self.isListEmpty = false;
                    }
                }).then(LoadingScreenService.finish());
        }

        function surveyQuerySearch(query) {
            var results = query ? self.survey.filter(_activityCreateFilterFor(query)) : self.surveys;
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(results);
            }, Math.random() * 1000, false);

            return deferred.promise;
        }

        function _activityCreateFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(survey) {
                return survey.name.toLowerCase().indexOf(lowercaseQuery) > -1 ||
                    survey.acronym.toLowerCase().indexOf(lowercaseQuery) > -1;
            };
        }


        function _loadActivityDtosfromStorage(){
          let _storageActivityDtos = angular.copy(JSON.parse(window.sessionStorage.getItem('activityDtos')));
          if(_storageActivityDtos){
              console.log(self.activityDtos)
              self.activityDtos = _storageActivityDtos;
              console.log(_storageActivityDtos);
          }
        }


//metodos de busca dos aferidores

        // function checkerQuerySearch(query) {
        //     var results = query ? self.checkers.filter(_checkerCreateFilterFor(query)) : self.checkers;
        //     var deferred = $q.defer();
        //
        //     $timeout(function() {
        //         deferred.resolve(results);
        //     }, Math.random() * 1000, false);
        //
        //     return deferred.promise;
        // }
        //
        // function _checkerCreateFilterFor(query) {
        //     var lowercaseQuery = angular.lowercase(query);
        //     return function filterFn(checker) {
        //         return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1;
        //     };
        // }

    }
}());

//clean
///home/fabiano/ccem/otus/source/app/deploy/state/activity/paper-activity-initializer-state-provider.js
//source/app/ux-component/paper-activity-initializer/paper-activity-initializer-component.js
//source/app/ux-component/activity-category-adder/activity-category-adder-component.js

//statusHistory.newInitializedOfflineRegistry(paperActivityData);
