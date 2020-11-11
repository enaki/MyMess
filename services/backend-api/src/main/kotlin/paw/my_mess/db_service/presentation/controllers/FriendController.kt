package paw.my_mess.db_service.presentation.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import paw.my_mess.db_service.business.error_handling.MyError
import paw.my_mess.db_service.business.interfaces.FriendService

@RestController

@RequestMapping("/api/friends")
class FriendController {

    @Autowired
    private lateinit var _friendService: FriendService

    @RequestMapping(value = ["/friendships"], method = [RequestMethod.GET])
    fun getAllFriendships(): ResponseEntity<Any>{
        val response = _friendService.getAllFriendships()
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/friend-requests"], method = [RequestMethod.GET])
    fun getAllFriendRequests(): ResponseEntity<Any>{
        val response = _friendService.getAllFriendRequests()
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/blocked"], method = [RequestMethod.GET])
    fun getAllBlockedFriends(): ResponseEntity<Any>{
        val response = _friendService.getAllBlockedFriends()
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }

    @RequestMapping(value = ["/friendships/{id}"], method = [RequestMethod.GET])
    fun getFriendships(
            @PathVariable("id") id: String
    ): ResponseEntity<Any?>{
        val response = this._friendService.getFriendship(id)
        return if (response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value = ["/friend-requests/{id}"], method = [RequestMethod.GET])
    fun getFriendRequests(
            @PathVariable("id") id: String
    ): ResponseEntity<Any?>{
        val response = this._friendService.getFriendRequests(id)
        return if (response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value = ["/{id}"], method = [RequestMethod.GET])
    fun getFriends(
            @PathVariable("id") id: String
    ): ResponseEntity<Any?>{
        val response = this._friendService.getFriends(id)
        return if (response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value= ["/request/{sender}"], method = [RequestMethod.POST])
    fun sendFriendRequest(
            @RequestParam(value = "target") target: String,
            @PathVariable("sender") sender: String
    ):ResponseEntity<Any?>{
        val response = this._friendService.sendFriendRequest(sender, target)
        return if(response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            return ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value= ["/refuse-request/{receiver}"], method = [RequestMethod.DELETE])
    fun refuseFriendRequest(
            @PathVariable("receiver") receiver: String,
            @RequestParam("sender") sender: String
    ):ResponseEntity<Any?>{
        val response = this._friendService.refuseFriendRequest(sender, targetId = receiver)
        return if(response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            return ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value= ["/accept-request/{receiver}"], method = [RequestMethod.POST])
    fun acceptFriendRequest(
            @PathVariable("receiver") receiver: String,
            @RequestParam("sender") sender: String
    ):ResponseEntity<Any?>{
        val response = this._friendService.acceptFriendRequest(sender, targetId = receiver)
        return if(response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            return ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value= ["/block/{userId}"], method = [RequestMethod.POST])
    fun blockFriend(
            @PathVariable("userId") userId: String,
            @RequestParam("blockedId") blockedId: String
    ):ResponseEntity<Any?>{
        val response = this._friendService.blockFriend(userId, targetId = blockedId)
        return if(response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            return ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value= ["/unblock/{userId}"], method = [RequestMethod.POST])
    fun unblockFriend(
            @PathVariable("userId") userId: String,
            @RequestParam("unblockedId") unblockedId: String
    ):ResponseEntity<Any?>{
        val response = this._friendService.unblockFriend(userId, targetId = unblockedId)
        return if(response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            return ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value= ["/blocked/{userId}"], method = [RequestMethod.GET])
    fun getBlockedFriends(
            @PathVariable("userId") userId: String
    ):ResponseEntity<Any?>{
        val response = this._friendService.getBlockedFriends(userId)
        return if(response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            return ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

    @RequestMapping(value= ["/{userId}"], method = [RequestMethod.DELETE])
    fun removeFriend(
            @PathVariable("userId") userId: String,
            @RequestParam("removeId") removeId: String
    ):ResponseEntity<Any?>{
        val response = this._friendService.removeFriend(userId, targetId = removeId)
        return if(response.successful_operation){
            ResponseEntity.status(response.code).body(response.data)
        }
        else{
            return ResponseEntity.status(response.code).body(
                    MyError(
                            response.code,
                            response.error,
                            response.message
                    )
            )
        }
    }

}