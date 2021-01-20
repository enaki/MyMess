package paw.my_mess.db_service.business.bussines_models.get

import BusinessUserChat
import paw.my_mess.db_service.persistence.entities.*


fun UserProfile.ToBusinessUserProfile(): BusinessUserProfile { return BusinessUserProfile(uid, status, birthdate, gender, dateRegistered, city, country ) }

fun User.ToBusinessUser(): BusinessUser {

    return BusinessUser(uid, userName, firstname, lastname, email, "http://localhost:2020/api/images/$avatarPath") }

fun Message.ToBusinessMessage(): BusinessMessage { return BusinessMessage(messageId, chatId, ownerId, replyToMessageId, text, imagePath, date) }

fun Friendship.ToBusinessFriendship(): BusinessFriendship { return BusinessFriendship(friendShipId, uid1, uid2) }

fun FriendRequest.ToBusinessFriendRequest(): BusinessFriendRequest { return BusinessFriendRequest(friendRequestId, fromId, toId) }

fun UserChat.ToBusinessUserChat(): BusinessUserChat { return BusinessUserChat(chatId,uid) }

fun BlockedUser.ToBusinessBlockedUser(): BusinessBlockedUser { return BusinessBlockedUser(blockedUsersId, uid, targetId) }


fun List<BusinessFriendship>.toFriendShipList(uid: String): BusinessFriendshipList{
    val list = this.map { if (uid == it.uid1) it.uid2 else it.uid1 }
    return BusinessFriendshipList(uid, list)
}

fun List<BusinessBlockedUser>.toBlockedUsersList(uid: String): BusinessBlockedUserList{
    val list = this.map { it.targetId }
    return BusinessBlockedUserList(uid, list)
}