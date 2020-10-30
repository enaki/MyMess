package paw.my_mess.db_service.business.error_handling

data class Response<T>(
        val successful_operation: Boolean,
        val code: Int,
        val data: T?,
        val error: String = "",
        val message: String = ""
)