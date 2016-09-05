package br.org.otus.survey.item.questions.selectable;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Embedded;

import br.org.otus.survey.item.questions.Question;
import br.org.otus.survey.item.questions.selectable.options.RadioOption;

public class SingleSelectionQuestion extends Question{
	
	@Embedded
	@ElementCollection
	private Set<RadioOption> options;
	
	public SingleSelectionQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "SingleSelectionQuestion";
		super.dataType = "Integer";
		
		options = new HashSet<RadioOption>();
	}

	public Set<RadioOption> getOptions() {
		return options;
	}
	
	public void addOption(RadioOption radioOption) {
		options.add(radioOption);
	}

}
