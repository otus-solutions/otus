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

    function Controller(ActivityService, ApplicationStateService, $mdDialog, DialogService, LoadingScreenService, $q, $timeout) {
        var self = this;
        var _selectedActivities = [];
        var _exitDialog;
        self.activities = [];
        self.candidatesActivities = [];
        self.statePreview = false;
        self.mode = "inLine";
        self.selectType = "activityUnit";

        /* Public methods */
        self.addActivities = addActivities;
        self.catchActivity = catchActivity;
        self.addPreviewActivity = addPreviewActivity;
        self.querySearch = querySearch;
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

        function addActivities() {
            if (_selectedActivities.length > 0) {
                _selectedActivities = [];
                ApplicationStateService.activateActivityCategories();
            } else {
                DialogService.showDialog(_exitDialog);
            }
        }

        function catchActivity(activity) {
            var activityIndex = _selectedActivities.indexOf(activity.acronym);
            if (activityIndex !== -1) {
                _selectedActivities.splice(activityIndex, 1);
                window.sessionStorage.setItem('selectedActivities', JSON.stringify(_selectedActivities));
            } else {
                _selectedActivities.push(activity.acronym);
                window.sessionStorage.setItem('selectedActivities', JSON.stringify(_selectedActivities));
            }
        }

        function addPreviewActivity(candidateActivity) {
          if(candidateActivity){
          self.candidatesActivities.push(candidateActivity);
          self.statePreview = true;
          }
        }

        function _loadCategories() {
            ActivityService
                .listAllCategories()
                .then(function (response) {
                    self.categories = response;
                });
        }

        function _loadActivities() {
            ActivityService.listAvailables()
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

        $timeout(function() {
          deferred.resolve(results);
        }, Math.random() * 1000, false);

        return deferred.promise;
      }

      function _createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);

        return function filterFn(activity) {
          return activity.name.toLowerCase().indexOf(lowercaseQuery) > -1 ||
          activity.acronym.toLowerCase().indexOf(lowercaseQuery) > -1 ;
        };
      }


    }
}());
