package paw.my_mess.db_service

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class DbServiceApplication

fun main(args: Array<String>) {
    println("Server running on: http://localhost:2020/api")
    runApplication<DbServiceApplication>(*args)
}
