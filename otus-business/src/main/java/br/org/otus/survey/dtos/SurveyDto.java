package br.org.otus.survey.dtos;

import java.util.List;

import br.org.otus.exceptions.webservice.security.EncryptedException;
import br.org.otus.rest.dtos.Dto;
import br.org.otus.survey.dtos.identity.IdentityDto;
import br.org.otus.survey.dtos.item.SurveyItemDto;
import br.org.otus.survey.dtos.metainfo.MetaInfoDto;
import br.org.otus.survey.dtos.navigation.NavigationDto;

public class SurveyDto implements Dto {

	public String extents;

	public String objectType;

	public String oid;

	public IdentityDto identity;

	public MetaInfoDto metainfo;

	public List<SurveyItemDto> itemContainer;

	public List<NavigationDto> navigationList;

	@Override
	public Boolean isValid() {
		boolean flag = true;
		

		if ((identity.isValid() && metainfo.isValid()) && (!oid.isEmpty())) {
			flag = true;
		} else {
			flag = false;
		}

		return flag;
	}

	@Override
	public void encrypt() throws EncryptedException {
	}

}
