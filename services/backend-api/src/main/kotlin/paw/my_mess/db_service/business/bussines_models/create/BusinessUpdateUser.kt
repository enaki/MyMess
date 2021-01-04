package paw.my_mess.db_service.business.bussines_models.create

data class BusinessUpdateUser (
        var username: String?,
        var passwordHash: String?,
        var firstName: String?,
        var lastName: String?,
        var email: String?,
        var birthdate: String?,
        var gender: String?,
        var status: String?,
        var city: String?,
        var country: String?,
        var avatarIcon: ByteArray?
)
