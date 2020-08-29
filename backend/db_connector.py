import psycopg2
import os


def post_data(value):
    con = psycopg2.connect(
        host="DESKTOP-N820N2N",
        database="imagedb",
        user="postgres",
        password=os.getenv("POSTGRES_PASS"),
        port=5432
    )
    cur = con.cursor()
    cur.execute("insert into images (description) values ('{0}')".format(str(value)))
    con.commit()
    cur.close()
    con.close()


def get_data():
    con = psycopg2.connect(
        host="DESKTOP-N820N2N",
        database="imagedb",
        user="postgres",
        password=os.getenv("POSTGRES_PASS"),
        port=5432
    )
    cur = con.cursor()
    cur.execute("select * from images")
    data = cur.fetchall()
    cur.close()
    con.close()
    return data
