
import psycopg2

def BeginTransaction():
    try:
        conn = psycopg2.connect(database="Spotyfake", user = "postgres", password = "123", host = "127.0.0.1", port = "5432")
        #print("")
        #print("Listo para realizar la Transaccion!")
        #print("__________________________")
        return conn
    except:
        print("Ocurrio un error al iniciar la Transaccion!")

#Funcion que finaliza una Transaccion
def EndTransaction(conexion):
    try:
        conexion.close()
        #print("Cerro la Transaccion!")
        #print("__________________________")
        #print("")
    except:
        print("Ocurrio un error al cerrar la Transaccion!")

#Funcion que realiza un commit a la DB
def CommitTransaction(conexion):
    try:
        conexion.commit()
        #print("")
        #print("Cambios realizados!")
        #print("__________________________")
        EndTransaction(conexion)
    except:
        print("Ocurrio un error al guardar la Transaccion!")
        #print("Se realilzara un Rollback automatico...")

        rollbackTransaction(conexion)

#Funcion que realiza un Rollback a la DB
def rollbackTransaction(conexion):
    try:
        conexion.rollback()
        print("")
        print("Realizado el RollBack correctamente!")
        print("__________________________")
        EndTransaction(conexion)
    except:
        print("Ocurrio un error al hacer Rollback!")


