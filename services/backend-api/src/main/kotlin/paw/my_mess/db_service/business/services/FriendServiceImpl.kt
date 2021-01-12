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
import java.sql.SQLDataException

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

    private fun checkUsersId(userId1: String, userId2: String?=null){
        this._userRepository.get(userId1)
                ?: throw NoSuchElementException("User $userId1 not found.")
        if (userId2 != null) this._userRepository.get(userId2)
                ?: throw NoSuchElementException("User $userId2 not found.")
    }

    private fun checkIdenticalUserIds(uid1: String, uid2: String, message: String="User with id $uid1 can't make this operation with himself."){
        if (uid1 == uid2){
            throw Throwable(message)
        }
    }

    override fun getAllFriendships(): Response<List<BusinessFriendship>> {
        return Response(successful_operation = true,
                code = 200,
                data = _friendRepository.getAll().map { it.ToBusinessFriendship() })
    }

    override fun getAllFriendRequests(): Response<List<BusinessFriendRequest>> {
        return Response(successful_operation = true,
                code = 200,
                data = _friendRequestRepository.getAll().map { it.ToBusinessFriendRequest() })
    }

    override fun getAllBlockedFriends(): Response<List<BusinessBlockedUser>> {
        return Response(successful_operation = true,
                code = 200,
                data = _blockedUserRepository.getAll().map { it.ToBusinessBlockedUser() })
    }

    override fun sendFriendRequest(senderId: String, targetId: String): Response<Any?> {
        return try {
            checkIdenticalUserIds(senderId, targetId, message = "User with id $senderId can't send a friend request to himself.")
            checkUsersId(senderId, targetId)

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
            checkIdenticalUserIds(senderId, targetId, message = "User with id $senderId does not have a friend request with himself.")
            checkUsersId(senderId, targetId)

            val response = this._friendRequestRepository.deleteFriendRequestByUsersId(
                    senderId,
                    targetId
            )
            if (!response) throw SQLDataException("The operation was not performed. The data is not found in database.")
            Response(
                    successful_operation = true,
                    code = 204,
                    data = response
            )
        }
        catch (error: SQLDataException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Data not found in database."
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
            checkIdenticalUserIds(senderId, targetId, message = "User with id $senderId does not have a friend request with himself.")
            checkUsersId(senderId, targetId)

            val response = this._friendRequestRepository.deleteFriendRequestByUsersId(
                    senderId,
                    targetId
            )
            if (!response) throw SQLDataException("The operation was not performed. The data is not found in database.")
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
        catch (error: SQLDataException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Data not found in database."
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

    //TODO ??? stergerea prieteniei dintre cele doua id-uri si adaugarea unei relatii de block in tabela ???
    override fun blockFriend(userId: String, targetId: String): Response<Any?> {
        return try {
            checkIdenticalUserIds(userId, targetId, message = "User with id $userId can not block himself.")
            checkUsersId(userId, targetId)
            val response = this._blockedUserRepository.add(
                    BlockedUser(
                            blockedUsersId = "",
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

    //TODO ??? stergerea inregistrarii din blocked users si introducerea relatiei de prietenie intre id-uri ???
    override fun unblockFriend(userId: String, targetId: String): Response<Any?> {
        return try {
            checkIdenticalUserIds(userId, targetId, message = "User with id $userId can not unblock himself.")
            checkUsersId(userId, targetId)

            val response = this._blockedUserRepository.deleteBlockedUserByIds(userId, targetId)
            if (!response) throw SQLDataException("The operation was not performed. The data is not found in database.")
            Response(
                    successful_operation = true,
                    code = 201,
                    data = response
            )
        }
        catch (error: SQLDataException){
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Data not found in database."
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

    override fun getFriends(userId: String, toList: Boolean): Response<Any?> {
        return try {
            checkUsersId(userId)

            val response = this._friendRepository.getFriendsByUserId(userId)
            val data = response.map { it.ToBusinessFriendship() }
            Response(
                    successful_operation = true,
                    code = 200,
                    data = if (!toList) data else data.toFriendShipList(userId)
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
            this._friendRepository.get(userId)
                    ?: throw NoSuchElementException("Friendship $userId not found.")

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

    override fun getBlockedFriends(userId: String, toList: Boolean): Response<Any?> {
        return try {
            checkUsersId(userId)
            val response = this._blockedUserRepository.getBlockedUsersByUserId(userId)
            val data = response.map { it.ToBusinessBlockedUser()}
            Response(
                    successful_operation = true,
                    code = 200,
                    data = if (!toList) data else data.toBlockedUsersList(userId)
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
            checkUsersId(userId, targetId)

            val response = this._friendRepository.deleteFriendByUsersId(userId, targetId)
            if (!response) throw SQLDataException("The operation was not performed. The data is not found in the database.")
            Response(
                    successful_operation = true,
                    code = 204,
                    data = response
            )
        }
        catch (error: SQLDataException) {
            Response(
                    successful_operation = false,
                    code = 404,
                    data = null,
                    error = error.message ?: "null",
                    message = "Data not found in database."
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

    override fun getFriendRequests(userId: String): Response<List<BusinessFriendRequest>> {
        return try {
            checkUsersId(userId)

            val response = this._friendRequestRepository.getFriendRequestsOfUserId(userId)
            Response(
                    successful_operation = true,
                    code = 200,
                    data = response.map { it.ToBusinessFriendRequest() }
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