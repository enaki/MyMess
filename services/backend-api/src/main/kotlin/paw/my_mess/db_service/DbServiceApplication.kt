package paw.my_mess.db_service

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.domain.AuditorAware
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import paw.my_mess.db_service.persistence.entities.User
import java.util.*

@SpringBootApplication
class DbServiceApplication {
    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder()
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            println("Server running on: http://localhost:2020/api")
            runApplication<DbServiceApplication>(*args)
        }
    }
}

@Configuration
@EnableJpaAuditing
internal class DataJpaConfig {
    @Bean
    fun auditor(): AuditorAware<User> {
        return AuditorAware<User> {
            Optional.ofNullable(SecurityContextHolder.getContext())
                    .map { obj: SecurityContext -> obj.authentication }
                    .filter { obj: Authentication -> obj.isAuthenticated }
                    .map { obj: Authentication -> obj.principal }
                    .map { obj: Any? -> User::class.java.cast(obj) }
        }
    }
}