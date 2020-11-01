package paw.my_mess.db_service.business.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import paw.my_mess.db_service.business.bussines_models.get.*
import paw.my_mess.db_service.business.error_handling.Response
import paw.my_mess.db_service.business.interfaces.FriendService
import paw.my_mess.db_service.persistence.entities.BlockedUser
import paw.my_mess.db_service.persistence.entities.FriendRequest
import paw.my_mess.db_service.persistence.entities.Friendship
import paw.my_mess.db_service.persistence.entities.User
import paw.my_mess.db_service.persistence.persistence.interfaces.IBlockedUserRepository
import paw.my_mess.db_service.persistence.persistence.interfaces.IFriendRepository
import paw.my_mess.db_service.persistence.persistence.interfaces.IRequestFriendRepository
import paw.my_mess.db_service.persistence.persistence.interfaces.IUserRepository

@Service
class FriendServiceImpl: FriendService {

    @Autowired
    private lateinit var _friendRepository: IFriendRepository<Friendship>

    @Autowired
    private lateinit var _blockedUserRepository: IBlockedUserRepository<BlockedUser>

    @Autowired
    private lateinit var _friendRequestRepository: IRequestFriendRepository<FriendRequest>

    @Autowired
    private lateinit var _userRepository: IUserRepository<User>

    override fun sendFriendRequest(senderId: String, targetId: String): Response<Any?> {
        return try {
            this._userRepository.get(senderId)
                    ?: throw NoSuchElementException("User $senderId not found.")
            this._userRepository.get(targetId)
                    ?: throw NoSuchElementException("User $targetId not found.")

            val response = this._friendRequestRepository.add(
                    FriendRequest(
                            friendRequestId = "",
                            fromId = senderId,
                            toId = targetId
                    )
            )
            Response(
                    successful_operation = true,
                    code = 201,
                    data = response
            )
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null",
                    message = "No info."
            )
        }
    }

    override fun refuseFriendRequest(senderId: String, targetId: String): Response<Any?> {
        return try {
            this._userRepository.get(senderId)
                    ?: throw NoSuchElementException("User $senderId not found.")
            this._userRepository.get(targetId)
                    ?: throw NoSuchElementException("User $targetId not found.")

            val response = this._friendRequestRepository.deleteFriendRequestByUsersId(
                    senderId,
                    targetId
            )
            Response(
                    successful_operation = true,
                    code = 204,
                    data = response
            )
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null"
            )
        }
    }

    override fun acceptFriendRequest(senderId: String, targetId: String): Response<Any?> {
        return try {
            this._userRepository.get(senderId)
                    ?: throw NoSuchElementException("User $senderId not found.")
            this._userRepository.get(targetId)
                    ?: throw NoSuchElementException("User $targetId not found.")
            val response = this._friendRequestRepository.deleteFriendRequestByUsersId(
                    senderId,
                    targetId
            )
            if(response){
                val tmp = this._friendRepository.add(
                        Friendship(
                                friendShipId = "",
                                uid1 = senderId,
                                uid2 = targetId
                        )
                )
                Response(
                        successful_operation = true,
                        code = 201,
                        data = this._friendRepository.get(tmp!!)
                )
            }
            else{
                Response(
                        successful_operation = true,
                        code = 200,
                        data = response
                )
            }
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null"
            )
        }
    }

    override fun blockFriend(userId: String, targetId: String): Response<Any?> {
        return try {
            this._userRepository.get(userId)
                    ?: throw NoSuchElementException("User $userId not found.")
            this._userRepository.get(targetId)
                    ?: throw NoSuchElementException("User $targetId not found.")
            val response = this._blockedUserRepository.add(
                    BlockedUser(
                            blockedUserId = "",
                            uid = userId,
                            targetId = targetId
                    )
            )
            Response(
                    successful_operation = true,
                    code = 201,
                    data = response
            )
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null"
            )
        }
    }

    override fun unblockFriend(userId: String, targetId: String): Response<Any?> {
        return try {
            this._userRepository.get(userId)
                    ?: throw NoSuchElementException("User $userId not found.")
            this._userRepository.get(targetId)
                    ?: throw NoSuchElementException("User $targetId not found.")
            val response = this._blockedUserRepository.add(
                    BlockedUser(
                            blockedUserId = "",
                            uid = userId,
                            targetId = targetId
                    )
            )
            Response(
                    successful_operation = true,
                    code = 201,
                    data = response
            )
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null"
            )
        }
    }

    override fun getFriends(userId: String): Response<List<BusinessFriendship>> {
        return try {
            this._userRepository.get(userId)
                    ?: throw NoSuchElementException("User $userId not found.")

            val response = this._friendRepository.getFriendsByUserId(userId)
            Response(
                    successful_operation = true,
                    code = 200,
                    data = response.map { it.ToBusinessFriendship() }
            )
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null"
            )
        }
    }

    override fun getFriendship(userId: String): Response<BusinessFriendship> {
        return try {
            this._userRepository.get(userId)
                    ?: throw NoSuchElementException("User $userId not found.")

            val response = this._friendRepository.get(userId)
            Response(
                    successful_operation = true,
                    code = 200,
                    data = response!!.ToBusinessFriendship()
            )
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null"
            )
        }
    }

    override fun getBlockedFriends(userId: String): Response<List<BusinessBlockedUser>> {
        return try {
            this._userRepository.get(userId)
                    ?: throw NoSuchElementException("User $userId not found.")
            val response = this._blockedUserRepository.getBlockedUsersByUserId(userId)

            Response(
                    successful_operation = true,
                    code = 200,
                    data = response.map { it.ToBusinessBlockedUser() }
            )
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null"
            )
        }
    }

    override fun removeFriend(userId: String, targetId: String): Response<Any?> {
        return try {
            this._userRepository.get(userId)
                    ?: throw NoSuchElementException("User $userId not found.")
            this._userRepository.get(targetId)
                    ?: throw NoSuchElementException("User $targetId not found.")

            val response = this._friendRepository.deleteFriendByUsersId(userId, targetId)
            Response(
                    successful_operation = true,
                    code = 204,
                    data = response
            )
        }
        catch (error: NoSuchElementException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Invalid id."
            )
        }
        catch (error: Throwable){
            Response(
                    successful_operation = false,
                    code = 400,
                    data = null,
                    error = error.message ?: "null"
            )
        }
    }
}