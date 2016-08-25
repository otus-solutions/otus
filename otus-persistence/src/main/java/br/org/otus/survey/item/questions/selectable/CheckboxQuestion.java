package br.org.otus.survey.item.questions.selectable;

import java.util.List;

import br.org.otus.survey.item.questions.Question;
import br.org.otus.survey.item.questions.selectable.options.CheckboxOption;

public class CheckboxQuestion extends Question {
	
	private static final String CHECKBOX_QUESTION = "CheckboxQuestion";
	
	private List<CheckboxOption> options;
	
	public CheckboxQuestion() {
		super.objectType = CHECKBOX_QUESTION;
		super.dataType = "Array";
	}

}
