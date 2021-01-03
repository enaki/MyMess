package paw.my_mess.db_service.presentation.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.http.MediaTypeFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import paw.my_mess.db_service.business.error_handling.MyError
import paw.my_mess.db_service.business.interfaces.ImageService

@RestController
@RequestMapping("/api/images")
class ResourceController {

    @Autowired
    private lateinit var _imageService: ImageService

    @RequestMapping(value=["/{name}"],method = [RequestMethod.GET])
    fun getImage(@PathVariable("name") name: String): ResponseEntity<Any?> {
        val response = _imageService.getImage(name)
        return ResponseEntity.status(response.code).contentType(MediaTypeFactory
                .getMediaType(response.data)
                .orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(response.data)

    }
    @RequestMapping(value=["/{uid}"],method=[RequestMethod.POST],consumes = [MediaType.IMAGE_PNG_VALUE])
    fun addImage(@PathVariable("uid") uid: String, @RequestBody bytes: ByteArray?): ResponseEntity<Any?>{
        val response = _imageService.createFile(uid,bytes!!)
        return if (response.successful_operation)
            ResponseEntity.status(response.code).body(response.data)
        else
            ResponseEntity.status(response.code).body(MyError(response.code, response.error, response.message))
    }
}