package br.org.otus.auditor;

import org.ccem.auditor.service.AuditorService;
import br.org.otus.security.AuthorizationHeaderReader;
import br.org.otus.security.context.SessionIdentifier;
import br.org.otus.security.services.SecurityContextService;
import org.apache.commons.io.IOUtils;
import org.ccem.auditor.model.LogEntry;
import org.ccem.auditor.model.SessionLog;

import javax.ejb.EJB;
import javax.inject.Inject;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.HttpMethod;
import javax.ws.rs.core.HttpHeaders;
import java.io.IOException;

@WebFilter(filterName = "auditorFilter", urlPatterns = {"/v01/*"})
public class AuditorServletFilter implements Filter {

    @Inject
    private SecurityContextService securityContextService;
    @EJB
    private AuditorService auditorService;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        ResettableStreamHttpServletRequest resettableStreamHttpServletRequest = new ResettableStreamHttpServletRequest(
                httpServletRequest);

        if (isLoggedMethod(httpServletRequest.getMethod())) {
            String body = IOUtils.toString(resettableStreamHttpServletRequest.getReader());
            String authorizationHeader = resettableStreamHttpServletRequest.getHeader(HttpHeaders.AUTHORIZATION);

            String token = readToken(authorizationHeader);
            SessionLog sessionLog = fetchSessionInformation(token);
            String remoteAddress = resettableStreamHttpServletRequest.getRemoteAddr();
            String url = resettableStreamHttpServletRequest.getRequestURL().toString();

            auditorService.log(new LogEntry(remoteAddress, url, body, sessionLog));
            resettableStreamHttpServletRequest.resetInputStream();
        }

        filterChain.doFilter(resettableStreamHttpServletRequest, servletResponse);
        return;
    }

    @Override
    public void destroy() {
    }

    private Boolean isLoggedMethod(String method) {
        if (HttpMethod.POST.equals(method) || HttpMethod.DELETE.equals(method) || HttpMethod.PUT.equals(method)) {
            return Boolean.TRUE;
        } else {
            return Boolean.FALSE;
        }
    }

    private String readToken(String authorizationHeader) {
        if (authorizationHeader != null) {
            return AuthorizationHeaderReader.readToken(authorizationHeader);
        } else {
            return "";
        }
    }

    private SessionLog fetchSessionInformation(String token) {
        try{
            SessionIdentifier session = securityContextService.getSession(token);
            return session.buildLog();
        }catch (Exception e){
            return new SessionLog();
        }
    }
}
