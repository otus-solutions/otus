(function () {
	'use strict'

	angular
		.module('otusjs.otus.uxComponent')
		.component('otusActivityAdderCard', {
			templateUrl: 'app/ux-component/activity-adder/activity-adder-card/activity-adder-card-template.html',
			controller: Controller,
			bindings: {
				preActivities: '=',
				checkers: '<',
				preActivity: '='
			}
		});

	Controller.$inject = [
		'$q',
		'$timeout'
	];

	function Controller($q, $timeout) {
		var self = this;
		self.realizationDate;

		/* Public methods */
		self.checkerQuerySearch = checkerQuerySearch;
		self.getModeIcon = getModeIcon;
		self.checkerSelectedItemChange = checkerSelectedItemChange;
		self.deletePreActivity = deletePreActivity;
		self.getAcronym = getAcronym;
		self.updateExternalID = updateExternalID;


		function checkerQuerySearch(query) {
			var results = query ? self.checkers.filter(_checkerCreateFilterFor(query)) : self.checkers;
			var deferred = $q.defer();

			$timeout(function () {
				deferred.resolve(results);
			}, Math.random() * 1000, false);

			return deferred.promise;
		}

		function _checkerCreateFilterFor(query) {
			var lowercaseQuery = angular.lowercase(query);
			return function filterFn(checker) {
				return checker.text.toLowerCase().indexOf(lowercaseQuery) > -1;
			};
		}

		function checkerSelectedItemChange(checker) {
			if (checker && self.realizationDate) {
			  self.preActivity.updatePaperActivityData(checker, self.realizationDate);
			  self.preActivity.updatePreActivityValid(self.checkerForm.$valid);
			}
			else {
			  self.preActivity.paperActivityData = undefined
        self.preActivity.updatePreActivityValid(self.checkerForm.$valid);
			};
		}

		function getModeIcon() {
			return self.preActivity.mode === "ONLINE" ? "signal" : "file-document"
		}

		function getAcronym() {
			return self.preActivity.surveyForm.surveyTemplate.identity.acronym;
		}

		function deletePreActivity() {
			self.preActivities.splice(self.preActivities.indexOf(self.preActivity), 1);
      window.sessionStorage.removeItem('preActivities');
      window.sessionStorage.setItem('preActivities', JSON.stringify(self.preActivities));

		}

		function updateExternalID(externalID) {
		  self.preActivity.externalID = externalID;
		  if(self.preActivity.mode === "PAPER") self.preActivity.updatePreActivityValid(self.externalIdForm.$valid && self.checkerForm.$valid);
		  else self.preActivity.updatePreActivityValid(self.externalIdForm.$valid);
    }
	}

})();