package br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.generic.GenericValidatorDto;

public class InDto extends GenericValidatorDto {

	public ValidatorInData data;

	// Inner class
	public class ValidatorInData {

		public RangeInReference reference;

		// Inner class
		public class RangeInReference {
			
			public Integer initial;
			public Integer end;
		}

	}

}
