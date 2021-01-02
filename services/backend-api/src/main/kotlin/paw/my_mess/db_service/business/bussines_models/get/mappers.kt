package paw.my_mess.db_service.business.bussines_models.get

import BusinessUserChat
import org.springframework.core.io.ClassPathResource
import paw.my_mess.db_service.persistence.entities.*
import java.io.ByteArrayOutputStream
import java.io.IOException
import java.io.File
import java.io.FileInputStream


fun UserProfile.ToBusinessUserProfile(): BusinessUserProfile { return BusinessUserProfile(uid, status, birthdate, gender, dateRegistered, city, country ) }

fun User.ToBusinessUser(): BusinessUser {
    val bos = ByteArrayOutputStream()
    val buf = ByteArray(1024)
    val file = ClassPathResource("images/$avatarPath")
    val fis = file.inputStream
    try {
        var readNum: Int = 0
        while (fis.read(buf).also { readNum = it } != -1) {

            //Writes to this byte array output stream
            bos.write(buf, 0, readNum)
        }
    } catch (ex: IOException) {
        //deschide path prestabilit
    }

    val bytes = bos.toByteArray()
    return BusinessUser(uid, userName, passwordHash, email, bytes) }

fun Message.ToBusinessMessage(): BusinessMessage { return BusinessMessage(messageId, chatId, ownerId, replyToMessageId, text, imagePath, date) }

fun Friendship.ToBusinessFriendship(): BusinessFriendship { return BusinessFriendship(friendShipId, uid1, uid2) }

fun FriendRequest.ToBusinessFriendRequest(): BusinessFriendRequest { return BusinessFriendRequest(friendRequestId, fromId, toId) }

fun UserChat.ToBusinessUserChat(): BusinessUserChat { return BusinessUserChat(chatId,uid) }

fun BlockedUser.ToBusinessBlockedUser(): BusinessBlockedUser { return BusinessBlockedUser(blockedUsersId, uid, targetId) }