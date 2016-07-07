package br.org.otus.auditor;

import br.org.otus.auditor.dto.LogEntryDto;

public interface AuditorService {
    void log(LogEntryDto logEntryDto);
}
