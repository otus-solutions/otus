package br.org.otus.survey.item.questions.numeric;

import javax.persistence.Embedded;

import br.org.otus.survey.item.questions.Question;
import br.org.otus.survey.item.questions.numeric.unit.Unit;

public abstract class NumericQuestion extends Question {

	@Embedded
	protected Unit unit;

	public NumericQuestion(String templateID, String customID) {
		super(templateID, customID);
	}

	public abstract void setUnit(Unit unit);

	public abstract Unit getUnit();

}
