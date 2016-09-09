package br.org.otus.survey.item.miscellaneous;

import javax.persistence.Embeddable;

import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.item.label.Label;

@Embeddable
public class TextItem extends SurveyItem {
	
	private Label value;
	
	public TextItem(String templateID, String customID) {
		super(templateID, customID);
		super.dataType = "String";
		super.objectType = "TextItem";
	}

	public Label getValue() {
		return value;
	}

	public void setValue(Label value) {
		this.value = value;
	}
	
}
