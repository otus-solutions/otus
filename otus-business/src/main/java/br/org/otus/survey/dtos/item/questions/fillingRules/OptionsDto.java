package br.org.otus.survey.dtos.item.questions.fillingRules;

import br.org.otus.survey.dtos.item.questions.fillingRules.validators.MandatoryDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.FutureDateDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.MaxDateDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.MinDateDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.PasteDateDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.calendar.RangeDateDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.decimal.ScaleDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.DistinctDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.InDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.LowerLimitDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.PrecisionDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.integer.UpperLimitDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.AlphanumericDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.LowerCaseDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.SpecialsDto;
import br.org.otus.survey.dtos.item.questions.fillingRules.validators.text.UpperCaseDto;

public class OptionsDto {
	
	public MandatoryDto mandatory;
	
	/* Calendar */
	
	public PasteDateDto pastDate;
	public FutureDateDto futureDate;
	public MinDateDto minDate;
	public RangeDateDto rangeDate;
	public MaxDateDto maxDate;
	
	/* Integer */
	
	public DistinctDto distinct;
	public LowerLimitDto lowerLimit;
	public UpperLimitDto upperLimit;
	public PrecisionDto precision;
	public InDto in;
	
	/* Decimal */
	
	public ScaleDto scale;
	
	/* Text */
	
	public AlphanumericDto alphanumeric;
	public LowerCaseDto lowerCase;
	public UpperCaseDto upperCase;
	public SpecialsDto specials;
	
	
	
	
	
	
	

}
