package br.org.otus.survey.item.questions.numeric;

public class DecimalQuestion extends NumericQuestion {

	public DecimalQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "DecimalQuestion";
		super.dataType = "Decimal";
	}
	
}
