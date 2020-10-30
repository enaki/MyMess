package paw.my_mess.db_service.persistence.entities

import java.sql.Date

data class UserProfile (
        var uid: String,
        var status: String,
        var birthdate: Date,
        var gender: String,
        var dateRegistered: Date,
        var city: String,
        var country: String

)