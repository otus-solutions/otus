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
		self.isValidExternalIdForm = true;

		/* Public methods */
		self.checkerQuerySearch = checkerQuerySearch;
		self.getModeIcon = getModeIcon;
		self.checkerSelectedItemChange = checkerSelectedItemChange;
		self.deleteActivityDto = deleteActivityDto;
		self.getAcronym = getAcronym;


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
			if (checker && self.realizationDate) self.activityDto.updatePaperActivityData(checker, self.realizationDate);
			else self.activityDto.paperActivityData = undefined;
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

	}

})();