import json
import time
import hashlib
import psycopg2

config = {
    "database": "mymess",
    "user": "paw",
    "password": "paw",
    "host": "localhost",
    "port": "5432",
}

DROP_TABLES_SCRIPT_PATH = "../sql/drop_tables.sql"
CREATE_TABLES_SCRIPT_PATH = "../sql/create_tables.sql"
POPULATE_TABLES_SCRIPT_PATH = "../sql/populate_tables.sql"


def insert_users(users, message="data"):
    start = time.time()
    print("\nInserting {} ...".format(message))

    conn = psycopg2.connect(database=config["database"], user=config["user"], password=config["password"],
                            host=config["host"], port=config["port"])
    print("Opened database successfully")
    cur = conn.cursor()

    for user in users:
        users_sql_script = """INSERT INTO users (username, passwordHash, email, firstname, lastname, avatarPath) VALUES ('{}', '{}', '{}', '{}', '{}', '{}') """.format(
            user["username"], hashlib.sha256(user["password"].encode('utf-8')).hexdigest(), user["email"],
            user["firstname"], user["lastname"], user["avatarPath"]
        )
        cur.execute(users_sql_script)

    conn.commit()
    conn.close()
    end = time.time()
    print("Finished inserting {} in {} seconds".format(message, end - start))


def execute_script(script_path, message=""):
    start = time.time()
    print("\n*** STARTING SCRIPT FOR {} ***".format(message.upper()))

    conn = psycopg2.connect(database=config["database"], user=config["user"], password=config["password"],
                            host=config["host"], port=config["port"])
    print("Opened database successfully")

    cur = conn.cursor()

    try:
        with open(script_path, "r") as script_file:
            cur.execute(script_file.read())
    except psycopg2.errors.UndefinedTable as e:
        print("<ERROR OCCURED>: {}".format(e))
    finally:
        conn.commit()
        conn.close()
        end = time.time()
        print("Finished {} in {} seconds".format(message.upper(), end - start))


def main():
    execute_script(DROP_TABLES_SCRIPT_PATH, message="DROPPING TABLES")
    execute_script(CREATE_TABLES_SCRIPT_PATH, message="CREATING TABLES")

    with open("users.json") as users_file:
        users = json.load(users_file)

    insert_users(users)

    execute_script(POPULATE_TABLES_SCRIPT_PATH, message="POPULATING TABLES")


if __name__ == '__main__':
    main()
