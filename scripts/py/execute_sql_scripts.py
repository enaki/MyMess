import time

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
    execute_script(POPULATE_TABLES_SCRIPT_PATH, message="POPULATING TABLES")


if __name__ == '__main__':
    main()
