package paw.my_mess.db_service.business.interfaces

import paw.my_mess.db_service.business.bussines_models.create.BusinessCreateUser
import paw.my_mess.db_service.business.bussines_models.create.BusinessUpdateUser
import paw.my_mess.db_service.business.bussines_models.get.BusinessUser
import paw.my_mess.db_service.business.bussines_models.get.BusinessUserProfile
import paw.my_mess.db_service.business.error_handling.Response

interface UserService {
    fun getAllUsers(): Response<List<BusinessUser>?>
    fun getUserById(uid: String): Response<BusinessUser?>
    fun createUser(user: BusinessCreateUser): Response<Any?>
    fun getAllUserProfiles(): Response<List<BusinessUserProfile>?>
    fun getUserProfileById(uid: String): Response<BusinessUserProfile?>
    fun updateUser(uid: String, user: BusinessUpdateUser): Response<Any?>
    fun deleteUserById(uid: String): Response<Any?>
}