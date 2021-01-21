package paw.my_mess.db_service.business.security.jwt

import com.google.gson.Gson
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.GenericFilterBean
import paw.my_mess.db_service.business.error_handling.MyError
import java.io.IOException
import javax.servlet.FilterChain
import javax.servlet.ServletException
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


class JwtTokenAuthenticationFilter(private val jwtTokenProvider: JwtTokenProvider) : GenericFilterBean() {
    @Throws(IOException::class, ServletException::class)
    override fun doFilter(req: ServletRequest, res: ServletResponse, filterChain: FilterChain) {
        try{
            val token = jwtTokenProvider.resolveToken((req as HttpServletRequest))
            if (token != null && jwtTokenProvider.validateToken(token)) {
                val auth = jwtTokenProvider.getAuthentication(token)
                SecurityContextHolder.getContext().authentication = auth
            }
            filterChain.doFilter(req, res)
        } catch (e: InvalidJwtAuthenticationException){
            val resp = res as HttpServletResponse
            resp.contentType = "application/json"
            resp.characterEncoding = "UTF-8"
            val text = Gson().toJson(MyError(401, "Provided Information is Invalid. JWT is invalid/expired", "Request a new JWT, maybe :)"))
            resp.addHeader("SC_UNAUTHORIZED", "Provided Information is Invalid");
            resp.status = 401
            resp.writer.print(text)
            resp.writer.close()
        }

    }
}