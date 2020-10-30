package paw.my_mess.db_service.business.bussines_models.get

import paw.my_mess.db_service.persistence.entities.Friendship

data class BusinessFriendship(
     var friendShipId: String,
     var uid1: String,
     var uid2: String
)


