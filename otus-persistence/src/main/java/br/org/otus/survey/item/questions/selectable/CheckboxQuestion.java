package br.org.otus.survey.item.questions.selectable;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

import br.org.otus.survey.item.questions.Question;
import br.org.otus.survey.item.questions.selectable.options.CheckboxOption;

@Embeddable
public class CheckboxQuestion extends Question {

	private static final String CHECKBOX_QUESTION = "CheckboxQuestion";
	@Embedded
	@ElementCollection
	private List<CheckboxOption> options;
	
	public CheckboxQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = CHECKBOX_QUESTION;
		super.dataType = "Array";
		
		options = new ArrayList<CheckboxOption>();
	}

	public List<CheckboxOption> getOptions() {
		return options;
	}
	
	public void addOption(CheckboxOption checkboxOption) {
		options.add(checkboxOption);
	}

}
