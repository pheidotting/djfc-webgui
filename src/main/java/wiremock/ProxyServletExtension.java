package wiremock;

import org.eclipse.jetty.http.HttpURI;
import org.eclipse.jetty.proxy.ProxyServlet;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;

public class ProxyServletExtension extends ProxyServlet {
    @Override
    protected URI rewriteURI(HttpServletRequest request) {
        // Forward all requests to another port on this machine
//        String uri = "http://localhost:8089";
//
//        // Take the current path and append it to the new url
//        String path = request.getRequestURI();
//
//        uri += path;
//
//        System.out.println(path);
//
//        // Add query params
//        String query = request.getQueryString();
//        if (query != null && query.length() > 0) {
//            uri += "?" + query;
//        }
//
//        System.out.println(uri);
        System.out.println(URI.create("http://www.telegraaf.nl"));

        return URI.create("http://www.telegraaf.nl");//.normalize();
    }
}