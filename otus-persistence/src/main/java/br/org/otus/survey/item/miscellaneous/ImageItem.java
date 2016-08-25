package br.org.otus.survey.item.miscellaneous;

import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.item.label.Label;

public class ImageItem extends SurveyItem {
	
	private String url;
	private Label footer;
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Label getFooter() {
		return footer;
	}
	public void setFooter(Label footer) {
		this.footer = footer;
	}

}
