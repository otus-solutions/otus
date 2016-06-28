package br.org.otus.auditor;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.*;

@Entity
public class Auditor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "init")
    private Date date;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<LogEntry> logEntries;

    public void addEntry(LogEntry logEntry) {
        logEntries.add(logEntry);
    }

    public void init() {
        date = new Date();
        logEntries = new HashSet<>();
    }

    public Boolean isEmpty(){
        return logEntries.isEmpty();
    }
}
