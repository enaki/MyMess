package paw.my_mess.db_service.presentation.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.password.MessageDigestPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import paw.my_mess.db_service.business.security.jwt.JwtSecurityConfigurer
import paw.my_mess.db_service.business.security.jwt.JwtTokenProvider


@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
    @Autowired
    lateinit var jwtTokenProvider: JwtTokenProvider

    @Bean
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return MessageDigestPasswordEncoder("SHA-256")

        //return PasswordEncoderFactories.createDelegatingPasswordEncoder()
        //return NoOpPasswordEncoder.getInstance()
        //val passEncoder = StandardPasswordEncoder()
        //return passEncoder
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
            .httpBasic().disable()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
            .antMatchers("/auth/signIn").permitAll()
            .antMatchers(HttpMethod.GET, "/api/**").permitAll()
            .antMatchers(HttpMethod.DELETE, "/api/**").permitAll()
            .antMatchers(HttpMethod.POST, "/api/**").permitAll()
            .antMatchers(HttpMethod.PUT, "/api/**").permitAll()
            .antMatchers(HttpMethod.GET, "/auth/me").hasRole("USER")
            .anyRequest().authenticated()
            .and()
            .apply(JwtSecurityConfigurer(jwtTokenProvider))
    }
}