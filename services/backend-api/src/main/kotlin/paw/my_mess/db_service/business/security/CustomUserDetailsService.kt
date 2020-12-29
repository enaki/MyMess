package paw.my_mess.db_service.business.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Component
import paw.my_mess.db_service.persistence.persistence.postgresql.repositories.UserRepository

@Component
class CustomUserDetailsService: UserDetailsService {
    @Autowired
    private lateinit var users: UserRepository

    override fun loadUserByUsername(username: String?): UserDetails {
        val user = username?.let { users.findByUsername(it) } ?: throw Exception("Username: $username not found")
        return user
    }

}