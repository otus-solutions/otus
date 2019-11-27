(function () {
	'use strict'

	angular
		.module('otusjs.otus.uxComponent')
		.component('otusActivityAdderCard', {
			templateUrl: 'app/ux-component/activity-adder/activity-adder-card/activity-adder-card-template.html',
			controller: Controller,
			bindings: {
				activityDtos: '=',
				checkers: '<',
				activityDto: '='
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
		self.deleteActivityDto = deleteActivityDto;
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
			  self.activityDto.updatePaperActivityData(checker, self.realizationDate);
			  self.activityDto.updatePreActivityValid(self.checkerForm.$valid);
			}
			else {
			  self.activityDto.paperActivityData = undefined
        self.activityDto.updatePreActivityValid(self.checkerForm.$valid);
			};
		}

		function getModeIcon() {
			return self.activityDto.mode === "ONLINE" ? "signal" : "file-document"
		}

		function getAcronym() {
			return self.activityDto.surveyForm.surveyTemplate.identity.acronym;
		}

		function deleteActivityDto() {
			self.activityDtos.splice(self.activityDtos.indexOf(self.activityDto), 1);
		}

		function updateExternalID(externalID) {
		  self.activityDto.externalID = externalID;
		  if(self.activityDto.mode === "PAPER") self.activityDto.updatePreActivityValid(self.externalIdForm.$valid && self.checkerForm.$valid);
		  else self.activityDto.updatePreActivityValid(self.externalIdForm.$valid);
    }
	}

})();