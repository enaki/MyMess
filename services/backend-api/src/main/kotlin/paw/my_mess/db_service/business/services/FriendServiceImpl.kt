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

    override fun sendFriendRequest(senderId: String, targetId: String): Response<Any?> {
        return try {
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

    override fun getFriends(userId: String): Response<List<BusinessFriendship>> {
        return try {
            checkUsersId(userId)

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

    override fun getBlockedFriends(userId: String): Response<List<BusinessBlockedUser>> {
        return try {
            checkUsersId(userId)
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
}