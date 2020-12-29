package paw.my_mess.db_service.presentation.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.web.bind.annotation.*
import paw.my_mess.db_service.business.bussines_models.get.AuthenticationRequest
import paw.my_mess.db_service.business.error_handling.MyError
import paw.my_mess.db_service.business.interfaces.AuthService
import java.util.stream.Collectors

@RestController
@RequestMapping("/auth")
class AuthenticationController {
    @Autowired
    private lateinit var _authService: AuthService


    @PostMapping("/signIn")
    fun signIn(@RequestBody data: AuthenticationRequest): ResponseEntity<*>? {
        val response = _authService.signIn(data.username, data.password)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @GetMapping("/me")
    fun currentUser(@AuthenticationPrincipal userDetails: UserDetails): ResponseEntity<*>? {
        val model: MutableMap<Any, Any> = HashMap()
        model["username"] = userDetails.username
        model["roles"] = userDetails.authorities
                .stream()
                .map { a: GrantedAuthority -> a.authority }
                .collect(Collectors.toList())
        return ResponseEntity.ok<Map<Any, Any>>(model)
    }

}