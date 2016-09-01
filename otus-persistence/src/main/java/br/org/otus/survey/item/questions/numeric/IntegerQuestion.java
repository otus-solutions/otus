package br.org.otus.survey.item.questions.numeric;

public class IntegerQuestion extends NumericQuestion {

	public IntegerQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "IntegerQuestion";
		super.dataType = "Integer";
	}
	
}
