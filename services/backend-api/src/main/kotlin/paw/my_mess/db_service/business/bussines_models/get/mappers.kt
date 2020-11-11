package paw.my_mess.db_service.business.bussines_models.get

import paw.my_mess.db_service.persistence.entities.*


fun BusinessUserProfile.ToUserProfile(): UserProfile { return UserProfile(uid, status, birthdate, gender, dataRegistered, city, country ) }
fun UserProfile.ToBusinessUserProfile(): BusinessUserProfile { return BusinessUserProfile(uid, status, birthdate, gender, dateRegistered, city, country ) }

fun BusinessUser.ToUser(): User { return User(uid, username, passwordHash, email, avatarPath) }
fun User.ToBusinessUser(): BusinessUser { return BusinessUser(uid, username, passwordHash, email, avatarPath) }

fun BusinessMessage.ToMessage(): Message { return Message(messageId, chatId, ownerId, text, imagePath, date) }
fun Message.ToBusinessMessage(): BusinessMessage { return BusinessMessage(messageId, chatId, ownerId, text, imagePath, date) }

fun BusinessFriendship.ToFriendship(): Friendship { return Friendship(friendShipId, uid1, uid2) }
fun Friendship.ToBusinessFriendship(): BusinessFriendship { return BusinessFriendship(friendShipId, uid1, uid2) }

fun BusinessFriendRequest.ToFriendRequest(): FriendRequest { return FriendRequest(friendRequestId, fromId, toId) }
fun FriendRequest.ToBusinessFriendRequest(): BusinessFriendRequest { return BusinessFriendRequest(friendRequestId, fromId, toId) }

fun BusinessChat.ToChat(): Chat { return Chat(chatId, uid) }
fun Chat.ToBusinessChat(): BusinessChat { return BusinessChat(chatId, uid) }

fun BusinessBlockedUser.ToBlockedUser(): BlockedUser { return BlockedUser(blockedUserId, uid, targetId) }
fun BlockedUser.ToBusinessBlockedUser(): BusinessBlockedUser { return BusinessBlockedUser(blockedUsersId, uid, targetId) }