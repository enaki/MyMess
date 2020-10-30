package paw.my_mess.db_service.business.bussines_models.create

data class BusinessCreateUser (
        var username: String,
        var passwordHash: String,
        var email: String,
        var birthdate: String,
        var gender: String,
        var city: String,
        var country: String
)
