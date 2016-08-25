package br.org.otus.survey.item.label.locale;

public abstract class GenericLabel {

	private String extents;
	private String objectType;
	private String oid;
	private String plainText;
	private String formattedText;

	public String getExtents() {
		return extents;
	}

	public void setExtents(String extents) {
		this.extents = extents;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getOid() {
		return oid;
	}

	public void setOid(String oid) {
		this.oid = oid;
	}

	public String getPlainText() {
		return plainText;
	}

	public void setPlainText(String plainText) {
		this.plainText = plainText;
	}

	public String getFormattedText() {
		return formattedText;
	}

	public void setFormattedText(String formattedText) {
		this.formattedText = formattedText;
	}

	@Override
	public String toString() {
		return "[extents=" + extents + ", objectType=" + objectType + ", oid=" + oid + ", plainText=" + plainText
				+ ", formattedText=" + formattedText + "]";
	}

}
