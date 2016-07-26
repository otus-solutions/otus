package br.org.otus.user;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.exceptions.DataNotFoundException;
import br.org.otus.user.dtos.SignupDataDto;
import br.org.tutty.Equalizer;

@Stateless
public class SignupDataServiceBean implements SignupDataService {

    @Inject
    private UserDao userDao;

    @Override
    public Boolean executeRegistration(SignupDataDto signupDataDto) {
        if (signupDataDto.isValid()) {
            try {
                userDao.fetchByEmail(signupDataDto.getEmail());
                return false;
            } catch (DataNotFoundException e) {
            	User user = new User();
            	Equalizer.equalize(signupDataDto, user);
                userDao.persist(user);
                return true;
            }
        } else {
            return false;
        }
    }
 
}
