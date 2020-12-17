package paw.my_mess.db_service.presentation.config

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.SecurityConfigurerAdapter
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.DefaultSecurityFilterChain
import paw.my_mess.db_service.presentation.security.jwt.JwtSecurityConfigurer
import paw.my_mess.db_service.presentation.security.jwt.JwtTokenProvider


@Configuration
class SecurityConfig : WebSecurityConfigurerAdapter() {
    @Autowired
    var jwtTokenProvider: JwtTokenProvider? = null

    @Bean
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        //@formatter:off
        http
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/auth/signin").permitAll()
                .antMatchers(HttpMethod.GET, "/api/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/vehicles/**").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .apply(JwtSecurityConfigurer(jwtTokenProvider!!))
        //@formatter:on
    }
}