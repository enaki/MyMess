package paw.my_mess.db_service.business.error_handling

import java.text.SimpleDateFormat
import java.util.*

data class MyError (
    var code: Int,
    var error: String,
    var info: String,
    var timestamp: String = SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Date())
)