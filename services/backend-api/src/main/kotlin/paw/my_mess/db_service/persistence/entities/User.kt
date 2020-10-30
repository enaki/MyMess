package paw.my_mess.db_service.persistence.entities

data class User (
        var uid: String,
        var username: String,
        var passwordHash: String,
        var email: String,
        var avatarPath: String
)