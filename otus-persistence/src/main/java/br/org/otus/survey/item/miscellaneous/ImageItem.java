package br.org.otus.survey.item.miscellaneous;

import javax.persistence.Embeddable;

import br.org.otus.survey.item.SurveyItem;
import br.org.otus.survey.item.label.Label;

@Embeddable
public class ImageItem extends SurveyItem {
	
	private String url;
	private Label footer;
	
	public ImageItem(String templateID, String customID) {
		super(templateID, customID);
		super.dataType = "String";
		super.objectType = "ImageItem";
		super.extents= "SurveyItem";
	}
	
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
