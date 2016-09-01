package br.org.otus.survey.item.questions.selectable;

import java.util.ArrayList;
import java.util.List;

import br.org.otus.survey.item.questions.Question;
import br.org.otus.survey.item.questions.selectable.options.RadioOption;

public class SingleSelectionQuestion extends Question{
	
	private List<RadioOption> options;
	
	public SingleSelectionQuestion(String templateID, String customID) {
		super(templateID, customID);
		super.objectType = "SingleSelectionQuestion";
		super.dataType = "Integer";
		
		options = new ArrayList<RadioOption>();
	}

	public List<RadioOption> getOptions() {
		return options;
	}
	
	public void addOption(RadioOption radioOption) {
		options.add(radioOption);
	}

}
