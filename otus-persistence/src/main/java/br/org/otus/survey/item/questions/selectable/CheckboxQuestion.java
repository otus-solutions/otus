package br.org.otus.survey.item.questions.selectable;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;

import br.org.otus.survey.item.questions.Question;
import br.org.otus.survey.item.questions.selectable.options.CheckboxOption;

public class CheckboxQuestion extends Question {

	private static final String CHECKBOX_QUESTION = "CheckboxQuestion";
	@Embedded
	@ElementCollection
	private Set<CheckboxOption> options;
	
	public CheckboxQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = CHECKBOX_QUESTION;
		super.dataType = "Array";
		
		options = new HashSet<CheckboxOption>();
	}

	public Set<CheckboxOption> getOptions() {
		return options;
	}
	
	public void addOption(CheckboxOption checkboxOption) {
		options.add(checkboxOption);
	}

}
