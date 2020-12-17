package paw.my_mess.db_service.presentation.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import paw.my_mess.db_service.business.bussines_models.get.AuthenticationRequest
import paw.my_mess.db_service.persistence.persistence.postgresql.repositories.UserRepository
import paw.my_mess.db_service.presentation.security.jwt.JwtTokenProvider

@RestController
@RequestMapping("/auth")
class AuthenticationController {
    @Autowired
    lateinit var authenticationManager: AuthenticationManager

    @Autowired
    lateinit var jwtTokenProvider: JwtTokenProvider

    @Autowired
    lateinit var users: UserRepository

    @PostMapping("/signin")
    fun signin(@RequestBody data: AuthenticationRequest): ResponseEntity<*>? {
        return try {
            val username: String = data.username!!
            val userPasswordAuthToken = UsernamePasswordAuthenticationToken(username, data.password)
            authenticationManager.authenticate(userPasswordAuthToken)
            val foundUser = users.findByUsername(username)
                    ?: throw UsernameNotFoundException("Username " + username + "not found")
            val token: String = jwtTokenProvider!!.createToken(username, foundUser.getRoles())
            val model: MutableMap<Any, Any> = HashMap()
            model["username"] = username
            model["token"] = token
            ResponseEntity.ok<Map<Any, Any>>(model)
        } catch (e: AuthenticationException) {
            throw BadCredentialsException("Invalid username/password supplied")
        }
    }

}