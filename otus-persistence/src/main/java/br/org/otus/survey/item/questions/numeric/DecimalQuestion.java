package br.org.otus.survey.item.questions.numeric;

import br.org.otus.survey.item.questions.numeric.unit.Unit;

public class DecimalQuestion extends NumericQuestion {

	public DecimalQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "DecimalQuestion";
		super.dataType = "Decimal";
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
