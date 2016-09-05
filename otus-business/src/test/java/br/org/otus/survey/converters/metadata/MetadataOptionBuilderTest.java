package br.org.otus.survey.converters.metadata;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import br.org.otus.survey.converters.label.LabelConverter;
import br.org.otus.survey.converters.metadata.MetadataOptionBuilder;
import br.org.otus.survey.dtos.item.metadata.MetadataOptionDtoTest;
import br.org.otus.survey.item.questions.metadata.MetadataOption;

public class MetadataOptionBuilderTest {

	private MetadataOption metadataOption;
	private MetadataOptionDtoTest dtoTest;

	@Before
	public void setUp() {
		dtoTest = new MetadataOptionDtoTest();
		dtoTest.setUp();

		metadataOption = new MetadataOptionBuilder().buildFromDto(dtoTest.metadataOptionDto).build();
	}

	@Test
	public void should_build_a_MetadataGroup_Object_correclty_with_a_Metadata_Group_Dto_values() {
		assertEquals(metadataOption.getExtents(), dtoTest.metadataOptionDto.extents);
		assertEquals(metadataOption.getObjectType(), dtoTest.metadataOptionDto.objectType);
		assertEquals(metadataOption.getDataType(), dtoTest.metadataOptionDto.dataType);
		assertEquals(metadataOption.getValue(), new Integer(dtoTest.metadataOptionDto.value));
		assertEquals(metadataOption.getLabel().toString(),
				new LabelConverter().convertFromDto(dtoTest.metadataOptionDto.label).toString());
	}

}
