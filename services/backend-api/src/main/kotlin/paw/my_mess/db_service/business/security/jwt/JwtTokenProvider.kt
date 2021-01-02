package paw.my_mess.db_service.business.security.jwt

import io.jsonwebtoken.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Component
import java.util.*
import javax.annotation.PostConstruct
import javax.servlet.http.HttpServletRequest


@Component
class JwtTokenProvider {
    @Autowired
    var jwtProperties: JwtProperties? = null

    @Autowired
    private val userDetailsService: UserDetailsService? = null
    private var secretKey: String? = null
    @PostConstruct
    protected fun init() {
        secretKey = Base64.getEncoder().encodeToString(jwtProperties!!.secretKey.toByteArray())
    }

    fun createToken(uid: String?, username: String?, roles: List<String?>?): String {
        val claims: Claims = Jwts.claims().setSubject(username)
        claims["uid"] = uid
        claims["roles"] = roles
        val now = Date()
        val validity: Date = Date(now.time + jwtProperties!!.validityInMs)
        return Jwts.builder() //
                .setClaims(claims) //
                .setIssuedAt(now) //
                .setExpiration(validity) //
                .signWith(SignatureAlgorithm.HS256, secretKey) //
                .compact()
    }

    fun getAuthentication(token: String?): Authentication {
        val userDetails = userDetailsService!!.loadUserByUsername(getUsername(token))
        return UsernamePasswordAuthenticationToken(userDetails, "", userDetails.authorities)
    }

    fun getUsername(token: String?): String {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).body.subject
    }

    fun resolveToken(req: HttpServletRequest): String? {
        val bearerToken = req.getHeader("Authorization")
        return if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            bearerToken.substring(7, bearerToken.length)
        } else null
    }

    fun validateToken(token: String?): Boolean {
        return try {
            val claims: Jws<Claims> = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
            !claims.body.expiration.before(Date())
        } catch (e: JwtException) {
            throw InvalidJwtAuthenticationException("Expired or invalid JWT token")
        } catch (e: IllegalArgumentException) {
            throw InvalidJwtAuthenticationException("Expired or invalid JWT token")
        }
    }
}
