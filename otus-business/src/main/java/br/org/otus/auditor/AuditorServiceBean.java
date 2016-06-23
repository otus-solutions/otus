package br.org.otus.auditor;

import br.org.otus.rest.dtos.LogEntryDto;
import br.org.tutty.Equalizer;

import javax.ejb.Asynchronous;
import javax.ejb.Schedule;
import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class AuditorServiceBean implements AuditorService{
    @Inject
    private AuditorDao auditorDao;

    @Inject
    private AuditorContext auditorContext;

    @Override
    @Asynchronous
    public void log(LogEntryDto logEntryDto) {
        LogEntry logEntry = new LogEntry();

        try {
            Equalizer.equalize(logEntryDto, logEntry);
            auditorContext.addLogEntry(logEntry);

        } catch (IllegalAccessException | NoSuchFieldException e) {
            e.printStackTrace();
        }
    }

    @Schedule(hour="*/1", info="Persist Auditor Log")
    public void persist(){
        Auditor auditor = auditorContext.getAuditor();
        if(!auditor.isEmpty()){
            auditorDao.merge(auditor);
            auditorContext.init();
        }
    }
}
