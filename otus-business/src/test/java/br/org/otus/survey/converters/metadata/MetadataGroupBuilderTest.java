package br.org.otus.survey.converters.metadata;

import org.junit.Before;
import org.junit.Test;

import br.org.otus.survey.converters.metadata.MetadataGroupBuilder;
import br.org.otus.survey.dtos.item.metadata.MetadataGroupDtoTest;
import br.org.otus.survey.item.questions.metadata.MetadataGroup;

import static org.junit.Assert.assertEquals;

public class MetadataGroupBuilderTest {
	
	private MetadataGroup metadataGroup;
	private MetadataGroupDtoTest dtoTest;
	
	@Before
	public void setUp() {
		dtoTest = new MetadataGroupDtoTest();
		dtoTest.setUp();
		
		metadataGroup = new MetadataGroupBuilder().buildFromDto(dtoTest.metadataGroupDto).build();
	}
	
	@Test
	public void should_build_a_MetadataGroup_Object_correclty_with_a_Metadata_Group_Dto_values() {
		assertEquals(metadataGroup.getExtents(), dtoTest.metadataGroupDto.extents);
		assertEquals(metadataGroup.getObjectType(), dtoTest.metadataGroupDto.objectType);
		assertEquals(metadataGroup.getOptions(), dtoTest.metadataGroupDto.options);
	}

}
