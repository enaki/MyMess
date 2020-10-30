package paw.my_mess.db_service.business.bussines_models.get

import java.sql.Date

data class BusinessUserProfile (
        var uid: String,
        var status: String,
        var birthdate: Date,
        var gender: String,
        var dataRegistered: Date,
        var city: String,
        var country: String
)
