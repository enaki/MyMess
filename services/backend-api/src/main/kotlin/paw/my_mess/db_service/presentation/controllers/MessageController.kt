package paw.my_mess.db_service.presentation.controllers

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController

@RequestMapping("/api/messages")
class MessageController {
    @GetMapping("")
    fun getHello(): String{
        return "Hello, Paw Project"
    }
}