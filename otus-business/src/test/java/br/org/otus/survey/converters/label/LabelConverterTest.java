package br.org.otus.survey.converters.label;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import br.org.otus.survey.dtos.item.label.LabelDtoTest;
import br.org.otus.survey.item.label.Label;

public class LabelConverterTest {
	
	private Label label;
	private LabelDtoTest labelDtoTest;
	
	@Before
	public void setUp() {
		labelDtoTest = new LabelDtoTest();
		labelDtoTest.setUp();
		
		label = new LabelConverter().convertFromDto(labelDtoTest.labelDto);
	}
	
	@Test
	public void should_convert_a_Label_Object_correrclty_with_a_Label_dto_values() {
		assertEquals(label.getPtBR().getExtents(), labelDtoTest.labelDto.ptBR.extents);
		assertEquals(label.getPtBR().getFormattedText(), labelDtoTest.labelDto.ptBR.formattedText);
		assertEquals(label.getPtBR().getObjectType(), labelDtoTest.labelDto.ptBR.objectType);
		assertEquals(label.getPtBR().getOid(), labelDtoTest.labelDto.ptBR.oid);
		assertEquals(label.getPtBR().getPlainText(), labelDtoTest.labelDto.ptBR.plainText);

		assertEquals(label.getEnUS().getExtents(), labelDtoTest.labelDto.enUS.extents);
		assertEquals(label.getEnUS().getFormattedText(), labelDtoTest.labelDto.enUS.formattedText);
		assertEquals(label.getEnUS().getObjectType(), labelDtoTest.labelDto.enUS.objectType);
		assertEquals(label.getEnUS().getOid(), labelDtoTest.labelDto.enUS.oid);
		assertEquals(label.getEnUS().getPlainText(), labelDtoTest.labelDto.enUS.plainText);

		assertEquals(label.getEsES().getExtents(), labelDtoTest.labelDto.esES.extents);
		assertEquals(label.getEsES().getFormattedText(), labelDtoTest.labelDto.esES.formattedText);
		assertEquals(label.getEsES().getObjectType(), labelDtoTest.labelDto.esES.objectType);
		assertEquals(label.getEsES().getOid(), labelDtoTest.labelDto.esES.oid);
		assertEquals(label.getEsES().getPlainText(), labelDtoTest.labelDto.esES.plainText);
	}

}
