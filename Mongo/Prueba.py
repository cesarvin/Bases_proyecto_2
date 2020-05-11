import pymongo as py
import psycopg2
import datetime as dt


# Obtiene las compras
def getSales(myDate):
    # Calculamos la fecha dentro de la cual va a buscar
    myDateStr = myDate.strftime("%Y-%m-%d %H:%M:%S")
    nextDayStr = (myDate + dt.timedelta(days=1)).strftime("%Y-%m-%d %H:%M:%S")

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
                  "WHERE inv.invoicedate < timestamp '" + nextDayStr + "' AND inv.invoicedate >= timestamp '" + myDateStr + "'"

        # Ejecutamos el query
        cursor.execute(myQuery)

        # Jalamos todos los resultados
        myResults = cursor.fetchall()

        # Creamos el diccionario
        myDict = {}

        # Lo llenamos
        for row in myResults:
            if row[1] in myDict:
                myDict[row[1]].append([row[3], float(row[4]), row[5]])
            else:
                myDict[row[1]] = [[row[3], float(row[4]), row[5]]]

        # Insertamos en Mongo
        insertSales(myDate, myDict)

    except (Exception, psycopg2.Error) as error:
        print("No se logro conectar a la base de datos", error)
    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()


# Inserta las compras en mongo
def insertSales(myDate, myDict):
    # Aquí se puede modificar la db y la colletion a la que se consulta
    myDatabase = "dummy_db"
    myColletion = "clientSales"

    # Realizamos la conexión
    myClient = py.MongoClient("mongodb://localhost:27017/")
    myDb = myClient[myDatabase]
    myCol = myDb[myColletion]

    # Creamos la lista que va a almacenar los documentos a insertar
    myList = []

    # Creamos la lista a donde
    for x in myDict:
        # Creamos el diccionario temporal
        nwDict = {"date": myDate, "clientid": x}

        # Obtenemos las ventas
        mySales = myDict[x]

        # Insertamos las compras en el campo
        for y in mySales:
            if "sales" in nwDict:
                nwDict["sales"].append({"trackid": y[0], "unitprice": y[1], "quantity": y[2]})
            else:
                nwDict["sales"] = [{"trackid": y[0], "unitprice": y[1], "quantity": y[2]}]

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

        # Mostramos la Lista
        for row in myDict:
            print("Canciones recomendadas para ", row, ":")
            for row2 in myDict[row]:
                print("Nombre de la canción: ", row2["TrackTitle"])
                print("Album: ", row2["AlbumTitle"])
                print("Artista: ", row2["ArtistName"])
                print("Género: ", row2["Genre"])
                print("Duración: ", row2["Duration"])
                print("Precio: $", row2["Price"], "\n")

    except (Exception, psycopg2.Error) as error:
        print("No se logro conectar a la base de datos", error)
    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()


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
                print("Ingresa la fecha a observar")
                try:
                    year = int(input("Año: "))
                    month = int(input("Mes: "))
                    day = int(input("Dia: "))
                    flag2 = False
                except (Exception) as error:
                    print("Error no se pudo conseguir la fecha")
            myDate = dt.datetime(year=year, month=month, day=day, hour=0, minute=0, second=0, microsecond=0)
            getSales(myDate)
        elif op == '2':
            recommendClient()
        elif op == '3':
            flag = False
        else:
            print("Ingrese una opción correcta")
        print("")