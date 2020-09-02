import psycopg2
import os

#Database password is stored in windows environment variables.

def post_data(value):
    con = psycopg2.connect(
        host="DESKTOP-N820N2N",
        database="imagedb",
        user="postgres",
        password=os.getenv("POSTGRES_PASS"),
        port=5432
    )
    cur = con.cursor()
    # TODO this should be protected against sql injection but not sure,
    #  it was quick copy paste from one article. Take a closer look if it's valid.
    cur.execute("insert into images (description) values (%s);", (value,))
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


def get_user(ident):
    con = psycopg2.connect(
        host="DESKTOP-N820N2N",
        database="imagedb",
        user="postgres",
        password=os.getenv("POSTGRES_PASS"),
        port=5432
    )
    cur = con.cursor()
    cur.execute(f"select * from accounts where email='{ident}'")
    data = cur.fetchall()
    cur.close()
    con.close()
    return data


def create_user(email, passw):
    con = psycopg2.connect(
        host="DESKTOP-N820N2N",
        database="imagedb",
        user="postgres",
        password=os.getenv("POSTGRES_PASS"),
        port=5432
    )
    cur = con.cursor()
    cur.execute("insert into accounts (email, password) values ('{0}', '{1}')".format(email, passw))
    con.commit()
    cur.close()
    con.close()
