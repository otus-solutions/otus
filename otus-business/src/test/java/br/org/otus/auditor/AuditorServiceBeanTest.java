package br.org.otus.auditor;

import br.org.otus.auditor.dto.LogEntryDto;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

@RunWith(PowerMockRunner.class)
@PrepareForTest({LogEntry.class, AuditorServiceBean.class})
public class AuditorServiceBeanTest {

    @InjectMocks
    private AuditorServiceBean auditorService;

    @Mock
    private AuditorDao auditorDao;

    @Mock
    private AuditorContext auditorContext;

    @Mock
    private LogEntryDto logEntryDto;

    @Mock
    private LogEntry logEntry;

    @Mock
    private Auditor auditor;

    @Test
    public void method_log_should_add_new_log_to_context() throws Exception {
        PowerMockito.whenNew(LogEntry.class).withNoArguments().thenReturn(logEntry);
        auditorService.log(logEntryDto);
        Mockito.verify(auditorContext).addLogEntry(logEntry);
    }

    @Test
    public void method_persist_should_verify_if_exist_log(){
        Mockito.when(auditorContext.getAuditor()).thenReturn(auditor);
        Mockito.when(auditor.isEmpty()).thenReturn(Boolean.TRUE);
        auditorService.persist();
        Mockito.verify(auditor).isEmpty();
    }

    @Test
    public void method_persist_should_persist_only_when_exist_data(){
        Mockito.when(auditorContext.getAuditor()).thenReturn(auditor);
        Mockito.when(auditor.isEmpty()).thenReturn(Boolean.FALSE);
        auditorService.persist();
        Mockito.verify(auditorDao).merge(auditor);
        Mockito.verify(auditorContext).init();
    }
}
