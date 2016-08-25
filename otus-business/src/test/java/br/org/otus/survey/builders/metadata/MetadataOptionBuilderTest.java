package br.org.otus.survey.builders.metadata;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import br.org.otus.survey.builders.label.LabelBuilder;
import br.org.otus.survey.builders.metadata.MetadataOptionBuilder;
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
		assertEquals(metadataOption.getValue(), dtoTest.metadataOptionDto.value);
		assertEquals(metadataOption.getLabel().toString(),
				new LabelBuilder().buildFromDto(dtoTest.metadataOptionDto.label).build().toString());
	}

}
