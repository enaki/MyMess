package paw.my_mess.db_service.presentation.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import paw.my_mess.db_service.business.bussines_models.create.BusinessCreateUser
import paw.my_mess.db_service.business.bussines_models.create.BusinessUpdateUser
import paw.my_mess.db_service.business.error_handling.MyError
import paw.my_mess.db_service.business.interfaces.UserService

@RestController

@RequestMapping("/api")
class UserController {

    @Autowired
    private lateinit var _userService: UserService

    // USERS
    @GetMapping(value= ["/users"])
    fun getUsers(): ResponseEntity<Any?>{
        val response = _userService.getAllUsers()
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/users/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    fun getUser(@PathVariable("id") id: String): ResponseEntity<Any?>{
        val response = _userService.getUserById(id)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/users/{id}"], method = [RequestMethod.DELETE])
    @ResponseBody
    fun deleteUser(@PathVariable("id") id: String): ResponseEntity<Any?>{
        val response = _userService.deleteUserById(id)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value= ["/users/{id}"], method = [RequestMethod.PUT])
    fun updateUser(@PathVariable("id") id: String, @RequestBody user: BusinessUpdateUser): ResponseEntity<Any?>{
        val response = _userService.updateUser(id, user)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value= ["/users"], method = [RequestMethod.POST])
    fun createUser(@RequestBody user: BusinessCreateUser): ResponseEntity<Any?>{
        val response = _userService.createUser(user)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    //USER PROFILES
    @GetMapping(value= ["/user-profiles"])
    fun getUserProfiles(): ResponseEntity<Any?>{
        val response = _userService.getAllUserProfiles()
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/user-profiles/{id}"], method = [RequestMethod.GET])
    @ResponseBody
    fun getUserProfile(@PathVariable("id") id: String): ResponseEntity<Any?>{
        val response = _userService.getUserProfileById(id)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }
}