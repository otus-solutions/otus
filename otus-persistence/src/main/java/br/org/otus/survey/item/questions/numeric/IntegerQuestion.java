package br.org.otus.survey.item.questions.numeric;

import br.org.otus.survey.item.questions.numeric.unit.Unit;

public class IntegerQuestion extends NumericQuestion {

	public IntegerQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "IntegerQuestion";
		super.dataType = "Integer";
	}

	@Override
	public void setUnit(Unit unit) {
		super.unit = unit;
	}

	@Override
	public Unit getUnit() {
		return unit;
	}
	
}
