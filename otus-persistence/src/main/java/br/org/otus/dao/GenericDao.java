package br.org.otus.dao;

import br.org.otus.exceptions.DataNotFoundException;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class GenericDao {

    @PersistenceContext
    protected EntityManager em;

    public void persist(Object object){
        em.persist(object);
    }

    public Object getSingleResult(String nativeQuery){
        return em.createNativeQuery(nativeQuery).getSingleResult();
    }

    public Object getSingleResult(String nativeQuery, Class clazz){
        return em.createNativeQuery(nativeQuery, clazz).getSingleResult();
    }

    public Object notWaitingEmpty(Object entity) throws DataNotFoundException {
        if(entity == null){
            throw new DataNotFoundException();
        }else {
            return entity;
        }
    }

}
