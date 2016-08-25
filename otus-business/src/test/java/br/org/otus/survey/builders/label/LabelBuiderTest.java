package br.org.otus.survey.builders.label;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import br.org.otus.survey.builders.label.LabelBuilder;
import br.org.otus.survey.dtos.item.label.LabelDtoTest;
import br.org.otus.survey.item.label.Label;

public class LabelBuiderTest extends LabelDtoTest {
	
	private Label label;
	
	@Before
	public void setUp() {
		super.setUp();
		label = new LabelBuilder().buildFromDto(labelDto).build();
	}
	
	@Test
	public void should_build_a_Label_Object_correclty_with_a_Label_dto_values() {
		assertEquals(label.getPtBR().getExtents(), labelDto.ptBR.extents);
		assertEquals(label.getPtBR().getFormattedText(), labelDto.ptBR.formattedText);
		assertEquals(label.getPtBR().getObjectType(), labelDto.ptBR.objectType);
		assertEquals(label.getPtBR().getOid(), labelDto.ptBR.oid);
		assertEquals(label.getPtBR().getPlainText(), labelDto.ptBR.plainText);

		assertEquals(label.getEnUS().getExtents(), labelDto.enUS.extents);
		assertEquals(label.getEnUS().getFormattedText(), labelDto.enUS.formattedText);
		assertEquals(label.getEnUS().getObjectType(), labelDto.enUS.objectType);
		assertEquals(label.getEnUS().getOid(), labelDto.enUS.oid);
		assertEquals(label.getEnUS().getPlainText(), labelDto.enUS.plainText);

		assertEquals(label.getEsES().getExtents(), labelDto.esES.extents);
		assertEquals(label.getEsES().getFormattedText(), labelDto.esES.formattedText);
		assertEquals(label.getEsES().getObjectType(), labelDto.esES.objectType);
		assertEquals(label.getEsES().getOid(), labelDto.esES.oid);
		assertEquals(label.getEsES().getPlainText(), labelDto.esES.plainText);
	}

}
