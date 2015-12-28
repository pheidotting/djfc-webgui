package wiremock;

import org.eclipse.jetty.proxy.ProxyServlet;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;

public class ProxyServletExtension extends ProxyServlet {
    protected URI rewriteURI(HttpServletRequest request) {

        System.out.println(request.getRequestURI());

        return URI.create("http://localhost:8888" + request.getRequestURI());
    }

}