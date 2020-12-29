package paw.my_mess.db_service.business.security.jwt

import lombok.Data
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration


@Configuration
@ConfigurationProperties(prefix = "jwt")
@Data
class JwtProperties {
    val secretKey = "my-darkest-secret"

    //validity in milliseconds
    val validityInMs: Long = 3600000 // 1h
}