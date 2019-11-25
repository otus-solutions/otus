(function () {
	'use strict';

	angular
		.module('otusjs.activity.business')
		.factory('otusjs.activity.business.ActivityDtoFactory', Factory);

	function Factory() {
		var self = this;
		self.create = create;

		function create(survey, configuration, mode, user) {
			return new ActivityDto(survey, configuration, mode, user);
		}
		return self;
	}

	function ActivityDto(survey, configuration, mode, user) {
		let self = this;
		self.objectType = 'ActivityDto';
		self.surveyForm = survey;
		self.configuration = configuration || {};
		//self.configuration.externalID = configuration.externalID || null;
		self.mode = mode;
		self.user = user || undefined;
		self.paperActivityData = undefined;
		self.externalID = undefined;

		/* Public methods */
		self.updatePaperActivityData = updatePaperActivityData;
		self.toJSON = toJSON;

		function updatePaperActivityData(checkerData, realizationDate) {
			self.paperActivityData = {};
			self.paperActivityData.checker = checkerData.checker;
			self.paperActivityData.realizationDate = realizationDate;
		}

		function toJSON() {
			return {
				objectType: self.objectType,
				surveyForm: self.surveyForm,
				configuration: self.configuration,
				mode: self.mode,
				user: self.user,
				paperActivityData: self.paperActivityData,
				externalID: self.externalID
			};
		}
	}
})();
