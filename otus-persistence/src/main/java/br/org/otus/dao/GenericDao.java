package br.org.otus.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by drferreira on 30/05/16.
 */
public class GenericDao {

    @PersistenceContext
    protected EntityManager em;

    public void persist(Object object){
        em.persist(object);
    }

    public Object getSingleResult(String nativeQuery){
        return em.createNativeQuery(nativeQuery).getSingleResult();
    }

}
