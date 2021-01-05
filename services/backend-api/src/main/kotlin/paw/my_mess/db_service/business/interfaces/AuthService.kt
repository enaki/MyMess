package paw.my_mess.db_service.business.interfaces

import paw.my_mess.db_service.business.bussines_models.get.AuthenticationResponse
import paw.my_mess.db_service.business.error_handling.Response

interface AuthService {
    fun signIn(username: String?, password: String?): Response<AuthenticationResponse?>
}