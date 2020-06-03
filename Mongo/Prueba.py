import pymongo as py
import psycopg2
import datetime as dt
import prettytable as pt


# Obtiene las compras
def getSales(initial_date, final_date):
    # Calculamos la fecha dentro de la cual va a buscar
    initial_date_str = initial_date.strftime("%Y-%m-%d %H:%M:%S")
    final_date_str = final_date.strftime("%Y-%m-%d %H:%M:%S")

    try:
        # Aqui los campos a editar para la conexión
        user = "postgres"
        password = "811Japan19"
        host = "127.0.0.1"
        port = "5432"
        database = "proyect2DB"

        # Probamos a realizar la conexión
        connection = psycopg2.connect(user=user,
                                      password=password,
                                      host=host,
                                      port=port,
                                      database=database)
        # Creamos la conexion
        cursor = connection.cursor()

        # Creamos el Query
        myQuery = "SELECT cus.firstname, cus.customerid, inv.invoicedate, inl.trackid, inl.unitprice, inl.quantity " + \
                  "FROM (invoice inv INNER JOIN invoiceline inl ON inv.invoiceid = inl.invoiceid) INNER JOIN customer cus ON cus.customerid = inv.customerid " + \
                  "WHERE inv.invoicedate < timestamp '" + final_date_str + "' AND inv.invoicedate >= timestamp '" + initial_date_str + "'"

        # Ejecutamos el query
        cursor.execute(myQuery)

        # Jalamos todos los resultados
        myResults = cursor.fetchall()

        # Creamos el diccionario
        myDict = {}

        # Lo llenamos
        for row in myResults:
            if row[1] in myDict:
                myDict[row[1]].append([row[2],row[3], float(row[4]), row[5]])
            else:
                myDict[row[1]] = [[row[2], row[3], float(row[4]), row[5]]]

        # Insertamos en Mongo
        insertSales(myDict)

    except (Exception, psycopg2.Error) as error:
        print("No se logro conectar a la base de datos", error)
    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()


# Inserta las compras en mongo
def insertSales(myDict):
    # Aquí se puede modificar la db y la colletion a la que se consulta
    myDatabase = "dummy_db"
    myColletion = "mysales"

    # Realizamos la conexión
    myClient = py.MongoClient("mongodb://localhost:27017/")
    myDb = myClient[myDatabase]
    myCol = myDb[myColletion]

    # Creamos la lista que va a almacenar los documentos a insertar
    myList = []

    # Creamos la lista a donde
    for x in myDict:
        # Creamos el diccionario temporal
        nwDict = {"clientid": x}

        # Obtenemos las ventas
        mySales = myDict[x]

        # Insertamos las compras en el campo
        for y in mySales:
            if "sales" in nwDict:
                nwDict["sales"].append({"date": y[0] , "trackid": y[1], "unitprice": y[2], "quantity": y[3]})
            else:
                nwDict["sales"] = [{"date": y[0] , "trackid": y[1], "unitprice": y[2], "quantity": y[3]}]

        # Insertamos el diccionario
        myList.append(nwDict)

    # Insertando un nuevo documento
    myCol.insert_many(myList)


# Recomienda canciones a 10 clientes
def recommendClient():
    try:
        # Aqui los campos a editar para la conexión
        user = "postgres"
        password = "811Japan19"
        host = "127.0.0.1"
        port = "5432"
        database = "proyect2DB"

        # Probamos a realizar la conexión
        connection = psycopg2.connect(user=user,
                                      password=password,
                                      host=host,
                                      port=port,
                                      database=database)
        # Creamos la conexion
        cursor = connection.cursor()

        # Creamos el primer Query
        myQuery = "SELECT tk.name, al.title, ar.name, ge.name, tk.milliseconds, tk.unitprice " + \
                  "FROM ((artist ar INNER JOIN album al ON ar.artistid = al.artistid) INNER JOIN track tk ON tk.albumid = al.albumid ) INNER JOIN genre ge ON tk.genreid = ge.genreid " + \
                  "ORDER BY tk.trackid DESC " + \
                  "LIMIT 100"

        # Lo ejecutamos
        cursor.execute(myQuery)

        # Jalamos todos los resultados
        mySongs = cursor.fetchall()

        # Creamos el segundo Query
        myQuery = "SELECT firstname, lastname FROM customer OFFSET floor(random()*(SELECT count(*) FROM customer)) LIMIT 10"

        # Lo ejecutamos
        cursor.execute(myQuery)

        # Jalamos todos los resultados
        myClients = cursor.fetchall()

        # Creamos el diccionario
        myDict = {}

        # Lo llenamos
        for x in range(len(myClients)):
            for y in range(len(mySongs) // 10):
                if myClients[x][0] + " " + myClients[x][1] in myDict:
                    myDict[myClients[x][0] + " " + myClients[x][1]].append(createDictionary(mySongs[x * 10 + y]))
                else:
                    myDict[myClients[x][0] + " " + myClients[x][1]] = [createDictionary(mySongs[x * 10 + y])]
        # Creamos la variable necesaria para Crear la tabla de resultados

        # Mostramos la Lista
        for row in myDict:
            print("Canciones recomendadas para ", row, ":")
            t = pt.PrettyTable(['Nombre de la canción', 'Álbum', 'Artista', 'Género', 'Duración', 'Precio'])
            for row2 in myDict[row]:
                t.add_row([row2["TrackTitle"], row2["AlbumTitle"], row2["ArtistName"], row2["Genre"], row2["Duration"], row2["Price"]])
            print(t, "\n")

        insertRecomendations(myDict)
    except (Exception, psycopg2.Error) as error:
        print("No se logro conectar a la base de datos", error)
    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()

# Inserta las recomendaciones en MongoDB
def insertRecomendations(myDict):
    # Aquí se puede modificar la db y la colletion a la que se consulta
    myDatabase = "dummy_db"
    myColletion = "myrecomendations"

    # Realizamos la conexión
    myClient = py.MongoClient("mongodb://localhost:27017/")
    myDb = myClient[myDatabase]
    myCol = myDb[myColletion]

    # Creamos la lista que va a almacenar los documentos a insertar
    myList = []

    # Llenamos los documentos
    for x in myDict:
        myList.append({"clientName": x, "recomendations": myDict[x]})



    # Insertando un nuevo documento
    myCol.insert_many(myList)


# Creamos un diccionario para guardalo de una manera más ordenada
def createDictionary(myArray):
    nwDic = {
        "TrackTitle": myArray[0],
        "AlbumTitle": myArray[1],
        "ArtistName": myArray[2],
        "Genre": myArray[3],
        "Duration": convertTime(myArray[4]),
        "Price": float(myArray[5])
    }
    return nwDic


# Convertimos el tiempo a insertar en duración real:
def convertTime(time):
    minutes = time // 60000
    seconds = (time % 60000) // 1000
    return str(minutes) + ":" + str(seconds)

if __name__ == '__main__':
    flag = True
    while flag:
        menu = 'Menú:\n    1. Registrar a nuevos clientes\n    2. Recomendar canciones a 10 clientes\n    3. Salir\nSeleccione una opción: '
        op = input(menu)
        print("")
        if op == '1':
            flag2 = True
            while flag2:
                print("Ingresa la fecha de inicio a observar")
                try:
                    initial_year = int(input("Año: "))
                    initial_month = int(input("Mes: "))
                    initial_day = int(input("Dia: "))
                    print("Ingrese la fecha final a observar")
                    final_year = int(input("Año: "))
                    final_month = int(input("Mes: "))
                    final_day = int(input("Dia: "))
                    flag2 = False
                except (Exception) as error:
                    print("Error no se pudo conseguir la fecha")
            initial_date = dt.datetime(year=initial_year, month=initial_month, day=initial_day, hour=0, minute=0, second=0, microsecond=0)
            final_date = dt.datetime(year=final_year, month=final_month, day=final_day, hour=0, minute=0, second=0, microsecond=0)
            getSales(initial_date, final_date)
        elif op == '2':
            recommendClient()
        elif op == '3':
            flag = False
        else:
            print("Ingrese una opción correcta")
        print("")