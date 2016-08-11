package br.org.otus.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import br.org.otus.exceptions.DataNotFoundException;

public class GenericDao {

    @PersistenceContext
    protected EntityManager em;

    public void persist(Object object){
        em.persist(object);
    }

    public void merge(Object object){
        em.merge(object);
    }

    public Object getSingleResult(String nativeQuery){
        return em.createNativeQuery(nativeQuery).getSingleResult();
    }

    public Object getSingleResult(String nativeQuery, Class clazz){
        return em.createNativeQuery(nativeQuery, clazz).getSingleResult();
    }

    public List getListResult(String nativeQuery, Class clazz){
        return em.createNativeQuery(nativeQuery, clazz).getResultList();
    }

    public Object notWaitingEmpty(Object entity) throws DataNotFoundException {
        if(entity == null){
            throw new DataNotFoundException();
        }else {
            return entity;
        }
    }

    public Boolean exist(Class clazz){
        long count = count(clazz);
        if (count == 0){
            return Boolean.FALSE;
        }else {
            return Boolean.TRUE;
        }
    }

    public Long count(Class clazz){
        return (Long) getSingleResult(String.format("db.%s.count()", clazz.getSimpleName()));
    }

    public void update(Object object){
        em.merge(object);
    }

}
