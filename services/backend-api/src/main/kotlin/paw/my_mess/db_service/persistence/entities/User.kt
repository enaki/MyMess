package paw.my_mess.db_service.persistence.entities

import lombok.Data
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import javax.persistence.Entity
import javax.persistence.Id

@Entity
@Data
data class User(
        @Id var uid: String = "",
        var userName: String,
        var passwordHash: String,
        var email: String,
        var avatarPath: String
) :UserDetails {
    fun getRoles(): List<String> {
        return listOf("user")
    }

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority("USER_ROLE"))
    }

    override fun getPassword(): String {
        return passwordHash
    }

    override fun getUsername(): String {
        return userName
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }
}