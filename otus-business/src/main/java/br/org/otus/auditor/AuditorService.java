package br.org.otus.auditor;

import br.org.otus.rest.dtos.LogEntryDto;

public interface AuditorService {
    void log(LogEntryDto logEntryDto);
}
