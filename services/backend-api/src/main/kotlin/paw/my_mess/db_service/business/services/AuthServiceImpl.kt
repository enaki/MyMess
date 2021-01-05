package paw.my_mess.db_service.business.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.stereotype.Service
import paw.my_mess.db_service.business.bussines_models.get.AuthenticationResponse
import paw.my_mess.db_service.business.error_handling.Response
import paw.my_mess.db_service.business.interfaces.AuthService
import paw.my_mess.db_service.business.security.jwt.JwtTokenProvider
import paw.my_mess.db_service.persistence.persistence.postgresql.repositories.UserRepository

@Service
class AuthServiceImpl: AuthService {
    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var jwtTokenProvider: JwtTokenProvider

    @Autowired
    lateinit var users: UserRepository

    override fun signIn(username: String?, password: String?): Response<AuthenticationResponse?> {
        try{
            if (username == null || password == null)
                return Response(successful_operation = false, data = null, code = 400, error = "Missing username/password")
            val userPasswordAuthToken = UsernamePasswordAuthenticationToken(username, password)
            authenticationManager.authenticate(userPasswordAuthToken)
            val foundUser = users.findByUsername(username)
                    ?: return Response(successful_operation = false, data = null, code = 400, error = "Username $username not found")
            val token: String = jwtTokenProvider.createToken(foundUser.uid, username, foundUser.getRoles())
            val authResponse = AuthenticationResponse(foundUser.uid, username, token)
            return Response(
                    successful_operation = true,
                    code = 200,
                    data = authResponse
            )
        } catch (e: AuthenticationException) {
            return Response(successful_operation = false, data = null, code = 400, error = "Invalid username/password supplied")
        }
    }
}