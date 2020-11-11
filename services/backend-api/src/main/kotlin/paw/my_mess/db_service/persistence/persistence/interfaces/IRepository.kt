package paw.my_mess.db_service.persistence.persistence.interfaces

interface IRepository<T> {

    /**
     * [getAll] method queries the database and gets all the existing records for a given table.
     * @return a [List] that contains all the records for the given table in the database.
     */
    fun getAll(): List<T>

    /**
     * [add] method adds a new record to the database.
     * @param item the new record to be introduced in the database.
     * @return a [String?] indicating the new record's unique id.
     */
    fun add(item: T): String?

    /**
     * [get] method gets a specific record from the database by its [id].
     * @param id the id to be searched in the database.
     * @return a valid entity if the specified [id] was found or null otherwise.
     */
    fun get(id: String): T?

    /**
     * [delete] method deletes a record from the database by the specified [id].
     * @param id the id record to be deleted in the database.
     * @return a [Boolean] value that indicates whether the operation was successful or not.
     */
    fun delete(id: String): Boolean

    /**
     * [update] method updates a record from the database by the specified [id] with the new data from [item].
     * @param id the id record to be updated in the database.
     * @param item the entity with updated values.
     * @return a [Boolean] value that indicates whether the operation was successful or not.
     */
    fun update(id: String, item: T): Boolean
}