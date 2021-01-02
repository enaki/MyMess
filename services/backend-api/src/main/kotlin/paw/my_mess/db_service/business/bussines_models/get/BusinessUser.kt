package paw.my_mess.db_service.business.bussines_models.get

data class BusinessUser (
        var uid: String,
        var username: String,
        var passwordHash: String,
        var email: String,
        var avatarLink: String
)


