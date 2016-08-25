package br.org.otus.survey.item.miscellaneous;

import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.item.label.Label;

public class TextItem extends SurveyItem {
	
	private Label value;

	public Label getValue() {
		return value;
	}

	public void setValue(Label value) {
		this.value = value;
	}
	
}
