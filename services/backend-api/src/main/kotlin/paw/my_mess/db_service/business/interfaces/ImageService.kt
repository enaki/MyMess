package paw.my_mess.db_service.business.interfaces

import org.springframework.core.io.UrlResource
import paw.my_mess.db_service.business.error_handling.Response

interface ImageService {
    fun getImage(name: String): Response<UrlResource>

}