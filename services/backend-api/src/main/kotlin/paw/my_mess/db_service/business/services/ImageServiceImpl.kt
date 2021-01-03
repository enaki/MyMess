package paw.my_mess.db_service.business.services

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.UrlResource
import org.springframework.stereotype.Service
import paw.my_mess.db_service.business.error_handling.Response
import paw.my_mess.db_service.business.interfaces.ImageService
import paw.my_mess.db_service.persistence.entities.User
import paw.my_mess.db_service.persistence.persistence.interfaces.IUserRepository
import java.awt.Image
import java.awt.image.BufferedImage
import java.io.ByteArrayInputStream
import java.io.File
import javax.imageio.ImageIO
import javax.imageio.ImageReader

@Service
class ImageServiceImpl : ImageService {

    @Autowired
    private lateinit var _userRepository: IUserRepository<User>

    override fun getImage(name: String): Response<UrlResource> {

        val urlResource = UrlResource("file:images/$name")
        if (urlResource.exists())
            return Response(successful_operation = true, code = 200, data = urlResource)
        else {
            val urlResource = UrlResource("file:images/not_found.png")
            return Response(successful_operation = true, code = 404, data = urlResource, error = "error on image", message = "No such file")
        }
    }

    override fun createFile(uid: String, icon: ByteArray): Response<Any?> {
        try {
            val user = _userRepository.get(uid)
                    ?: return Response(successful_operation = false, code = 404, data = null, error = "user not found", message = "");
            //cream imaginea
            val bis = ByteArrayInputStream(icon)
            val readers: Iterator<*> = ImageIO.getImageReadersByFormatName("png")

            val reader = readers.next() as ImageReader
            val source: Any = bis
            val iis = ImageIO.createImageInputStream(source)
            reader.setInput(iis, true)
            val param = reader.defaultReadParam

            val image: Image = reader.read(0, param)

            //got an image file
            val bufferedImage = BufferedImage(image.getWidth(null), image.getHeight(null), BufferedImage.TYPE_INT_RGB)
            //bufferedImage is the RenderedImage to be written

            //bufferedImage is the RenderedImage to be written
            val g2 = bufferedImage.createGraphics()
            g2.drawImage(image, null, null)

            val fileLocation = "$uid-${System.currentTimeMillis()}.png"
            val imageFile = File("images/$fileLocation")
            imageFile.createNewFile()
            ImageIO.write(bufferedImage, "png", imageFile)
            user.avatarPath = fileLocation
            _userRepository.update(uid, user)
            return Response(successful_operation = true, code = 200, data = "success")
        } catch (e: Exception) {
            println(e.message)
            return Response(successful_operation = false, code = 404, data = null, error = "user not found", message = "")
        }
    }
}