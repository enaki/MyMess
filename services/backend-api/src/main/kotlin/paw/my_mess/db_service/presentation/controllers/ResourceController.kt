package paw.my_mess.db_service.presentation.controllers

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.MediaType
import org.springframework.http.MediaTypeFactory
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import paw.my_mess.db_service.business.interfaces.ImageService

@RestController
@RequestMapping("/api/images")
class ResourceController {


    @Autowired
    private lateinit var _imageService: ImageService

    @RequestMapping("/{name}")
    fun getImage(@PathVariable("name") name: String): ResponseEntity<Any?> {
        val response = _imageService.getImage(name)
        return ResponseEntity.status(response.code).contentType(MediaTypeFactory
                .getMediaType(response.data)
                .orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(response.data)

    }
}