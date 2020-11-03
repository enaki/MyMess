package paw.my_mess.db_service.business.bussines_models.create

data class BusinessCreateMessage (
        var chatId: String,
        var ownerId: String,
        var text: String,
        var imagePath: String
)
