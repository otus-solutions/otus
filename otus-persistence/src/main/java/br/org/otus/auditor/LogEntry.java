package br.org.otus.auditor;

import br.org.tutty.Equalization;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;
import java.util.Map;

@Entity
public class LogEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Type(type = "objectid")
    private String id;

    @Equalization(name = "date")
    private Date date;

    @Equalization(name = "ip")
    private String ip;

    @Equalization(name = "restURL")
    private String restURL;

    @Equalization(name = "body")
    private String body;

    @Equalization(name = "userId")
    private String userId;

/*    @Equalization(name = "params")
    private Map<String, String[]> params;*/

    @Equalization(name = "token")
    private String token;
}
