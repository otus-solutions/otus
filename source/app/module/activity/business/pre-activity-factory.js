(function () {
	'use strict';

	angular
		.module('otusjs.activity.business')
		.factory('otusjs.activity.business.PreActivityFactory', Factory);

	function Factory() {
		let self = this;
		self.create = create;

		function create(survey, configuration, mode, user, externalID) {
			return new preActivity(survey, configuration, mode, user, externalID);
		}
		return self;
	}

	function preActivity(survey, configuration, mode, user, externalID) {
		let self = this;
		self.objectType = 'preActivity';
		self.surveyForm = survey;
		self.configuration = configuration || {};
		self.mode = mode;
		self.user = user || undefined;
    self.paperActivityData = undefined;
    self.externalID = externalID || null;
    self.preActivityValid = false;

		/* Public methods */
		self.updatePaperActivityData = updatePaperActivityData;
    self.updatePreActivityValid = updatePreActivityValid;
		self.toJSON = toJSON;


		function updatePaperActivityData(checkerData, realizationDate) {
		  if(!checkerData) self.preActivityValid = false;
		  else{
        self.paperActivityData = {};
        self.paperActivityData.checker = checkerData.checker;
        self.paperActivityData.realizationDate = realizationDate;
      }
		}

    function updatePreActivityValid(state){
		  self.preActivityValid = state;
    }

		function toJSON() {
			return {
				objectType: self.objectType,
				surveyForm: self.surveyForm,
				configuration: self.configuration,
				mode: self.mode,
				user: self.user,
				paperActivityData: self.paperActivityData,
				externalID: self.externalID,
        preActivityValid: self.preActivityValid
			};
		}
	}
})();
