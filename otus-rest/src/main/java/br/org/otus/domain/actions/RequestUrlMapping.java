package br.org.otus.domain.actions;

import javax.servlet.http.HttpServletRequest;

public class RequestUrlMapping {

    public static String getUrl(HttpServletRequest request){
        StringBuffer projectRestUrl = new StringBuffer();
        projectRestUrl.append("http://");
        projectRestUrl.append(request.getServerName());
        projectRestUrl.append(":");
        projectRestUrl.append(request.getServerPort());
        projectRestUrl.append(request.getContextPath());
        projectRestUrl.append(request.getServletPath());

        return projectRestUrl.toString();
    }
}
