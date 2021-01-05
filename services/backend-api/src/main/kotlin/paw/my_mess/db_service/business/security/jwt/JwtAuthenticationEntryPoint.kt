package paw.my_mess.db_service.business.security.jwt

import lombok.extern.slf4j.Slf4j
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import java.io.IOException
import javax.servlet.ServletException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Slf4j
class JwtAuthenticationEntryPoint : AuthenticationEntryPoint {
    @Throws(IOException::class, ServletException::class)
    override fun commence(request: HttpServletRequest, response: HttpServletResponse,
                          authException: AuthenticationException) {
        print("Jwt authentication failed:$authException")
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Jwt authentication failed")
    }
}