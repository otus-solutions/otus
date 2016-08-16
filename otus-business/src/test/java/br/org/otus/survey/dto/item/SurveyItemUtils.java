package br.org.otus.survey.dto.item;

public enum SurveyItemUtils {
	
	/**
	 * 
	 * Questions
	 * 
	 */
	CALENDAR_QUESTION(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"CalendarQuestion\","
			+ "\"templateID\": \"TY1\","
			+ "\"customID\": \"TY1\","
			+ "\"dataType\": \"LocalDate\","
			+ "\"label\": {},"
			+ "\"metadata\": {},"
			+ "\"fillingRules\": {}}"),
	
	INTEGER_QUESTION("{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"IntegerQuestion\","
			+ "\"templateID\": \"TY2\","
			+ "\"customID\": \"TY2\","
			+ "\"dataType\": \"Integer\","
			+ "\"label\": {},"
			+ "\"metadata\": {},"
			+ "\"unit\": {},"
			+ "\"fillingRules\": {}}"),
	
	DECIMAL_QUESTION(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"DecimalQuestion\","
			+ "\"templateID\": \"TY3\","
			+ "\"customID\": \"TY3\","
			+ "\"dataType\": \"Decimal\","
			+ "\"label\": {},"
			+ "\"metadata\": {},"
			+ "\"unit\": {},"
			+ "\"fillingRules\": {}}"),
	
	SINGLE_SELECTION_QUESTION(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"SingleSelectionQuestion\","
			+ "\"templateID\": \"TY4\","
			+ "\"customID\": \"TY4\","
			+ "\"dataType\": \"Integer\","
			+ "\"label\": {},"
			+ "\"options\": [],"
			+ "\"metadata\": {},"
			+ "\"fillingRules\": {}}"),
	
	CHECKBOX_QUESTION(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"CheckboxQuestion\","
			+ "\"templateID\": \"TY5\","
			+ "\"customID\": \"TY5\","
			+ "\"dataType\": \"Array\","
			+ "\"label\": {},"
			+ "\"options\": [],"
			+ "\"metadata\": {},"
			+ "\"fillingRules\": {}}"),
	
	TEXT_QUESTION(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"TextQuestion\","
			+ "\"templateID\": \"TY6\","
			+ "\"customID\": \"TY6\","
			+ "\"dataType\": \"String\","
			+ "\"label\": {},"
			+ "\"metadata\": {},"
			+ "\"fillingRules\": {}}"),
	
	EMAIL_QUESTION(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"EmailQuestion\","
			+ "\"templateID\": \"TY7\","
			+ "\"customID\": \"TY7\","
			+ "\"dataType\": \"String\","
			+ "\"label\": {},"
			+ "\"metadata\": {},"
			+ "\"fillingRules\": {}}"),
	
	TIME_QUESTION(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"TimeQuestion\","
			+ "\"templateID\": \"TY8\","
			+ "\"customID\": \"TY8\","
			+ "\"dataType\": \"LocalTime\","
			+ "\"label\": {},"
			+ "\"metadata\": {},"
			+ "\"fillingRules\": {}}"),
	
	PHONE_QUESTION(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"PhoneQuestion\","
			+ "\"templateID\": \"TY9\","
			+ "\"customID\": \"TY9\","
			+ "\"dataType\": \"Integer\","
			+ "\"label\": {},"
			+ "\"metadata\": {},"
			+ "\"fillingRules\": {}}"),
	/**
	 * 
	 * Miscellaneous Items
	 * 
	 */
	TEXT_ITEM(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"TextItem\","
			+ "\"templateID\": \"TY10\","
			+ "\"customID\": \"TY10\","
			+ "\"dataType\": \"String\","
			+ "\"value\": {}}"),
	
	IMAGE_ITEM(""
			+ "{\"extents\": \"SurveyItem\","
			+ "\"objectType\": \"ImageItem\","
			+ "\"templateID\": \"TY11\","
			+ "\"customID\": \"TY11\","
			+ "\"dataType\": \"String\","
			+ "\"url\": \"http://www.site.com/imagem.jpg\","
			+ "\"footer\": {}}");
	
	private String json;

	SurveyItemUtils(String json) {
        this.json = json;
    }

    public String json() {
        return json;
    }
    
}
