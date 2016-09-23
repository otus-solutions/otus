package br.org.otus.auditor;

import br.org.mongodb.MongoGenericDao;
import com.google.gson.Gson;
import org.ccem.auditor.model.Auditor;
import org.ccem.auditor.persistence.AuditorDao;

import javax.ejb.Local;

@Local(AuditorDao.class)
public class AuditorDaoBean extends MongoGenericDao implements AuditorDao {
    private static final String COLLECTION_NAME = "Auditor";

    public AuditorDaoBean() {
        super(COLLECTION_NAME);
    }

    public void persist(Auditor auditor) {
        super.persist(new Gson().toJson(auditor));
    }
}
