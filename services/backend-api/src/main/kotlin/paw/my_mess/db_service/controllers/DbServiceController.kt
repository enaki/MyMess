package paw.my_mess.db_service.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.Mapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController

@RequestMapping("/api")
class DbServiceController {
    @GetMapping("")
    fun getHello(): String{
        return "Hello, Paw Project"
    }
}