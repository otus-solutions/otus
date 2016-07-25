package br.org.otus.user;

import javax.ejb.Stateless;
import javax.inject.Inject;

import br.org.otus.exceptions.DataNotFoundException;

@Stateless
public class SignupDataServiceBean implements SignupDataService {

    @Inject
    private UserDao userDao;

    @Override
    public Boolean executeRegistration(SignupDataDto signupDataDto) {
        if (isSignupDataComplete(signupDataDto) && isPasswordConfirmed(signupDataDto)) {
            try {
                userDao.fetchByEmail(signupDataDto.getEmail());
                return false;
            } catch (DataNotFoundException e) {
                userDao.persist(signupDataDto);
                return true;
            }
        } else {
            return false;
        }
    }

    private Boolean isSignupDataComplete(SignupDataDto signupDataDto) {
        if (signupDataDto.getCellNumber().isEmpty()) {
            return false;
        }

        if (signupDataDto.getEmail().isEmpty()) {
            return false;
        }

        if (signupDataDto.getName().isEmpty()) {
            return false;
        }

        if (signupDataDto.getPassword().isEmpty()) {
            return false;
        }

        if (signupDataDto.getPasswordConfirmation().isEmpty()) {
            return false;
        }

        if (signupDataDto.getSurname().isEmpty()) {
            return false;
        }

        return true;
    }
    
    private Boolean isPasswordConfirmed(SignupDataDto signupDataDto) {
        return signupDataDto.getPassword().equals(signupDataDto.getPasswordConfirmation());
    }

}
