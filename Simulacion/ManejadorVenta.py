

from conexionDB import *
from random import randint

class GeneradorVentas(object):
    def __init__(self):
        self.usuarios = []
        self.canciones = []
        self.play = []
        self.largo = 0
        self.largoC = 0
        self.largoP = 0
        self.CargarUsuarios()
        self.CargarCanciones()
        self.cargarPlay()

    def CargarUsuarios(self):

        cnn = BeginTransaction()
        cur = cnn.cursor()
        consulta = "select * from customer"
        cur.execute(consulta)


        #CustomerId 0
        #Address 4
        #City 5
        #State 6
        #Country 7
        #PostalCode 8
        #lista = cur.fetchall()
        lista = cur.fetchall()
        if (len(lista) > 0):
            for i in lista:

                self.usuarios.append([str(i[0]), str(i[4]), str(i[5]), str(i[6]), str(i[7]), str(i[8])])
            #print("")
            #print("__________________________")
        else:
            print("Error al cargar usuarios")
        EndTransaction(cnn)

        self.largo = len(self.usuarios)
        # print(str(self.largo))
        """
        for i in self.usuarios:
            print("CustomerId: " + str(i[0]))
            print("Address: " + str(i[1]))
            print("City: " + str(i[2]))
            print("State: " + str(i[3]))
            print("Country: " + str(i[4]))
            print("PostalCode: " + str(i[5]))
        """

    def SimularPlay(self):
        npc = self.play[self.aleatorio(self.largoP)]

        cnn = BeginTransaction()
        cur = cnn.cursor()

        consulta = "INSERT INTO TrackPlayed(AccountId, TrackId, DatePlayed) VALUES("+str(npc[0])+","+str(npc[1])+", now())"
        cur.execute(consulta)
        CommitTransaction(cnn)

        EndTransaction(cnn)

    def SimularVenta(self, fecha):

        npc=self.usuarios[self.aleatorio(self.largo)]

        total = -1.11

        cnn = BeginTransaction()
        cur = cnn.cursor()
        c1 ="insert into Invoice(CustomerId, InvoiceDate, BillingAddress, BillingCity, BillingState, BillingCountry, BillingPostalCode, Total) "
        c2 ="VALUES( "+str(npc[0])+", '"+fecha+"', '"+str(npc[1])+"','"+str(npc[2])+"','"+str(npc[3])+"', '"+str(npc[4])+"','"+str(npc[5])+"', "+str(total)+")"

        consulta = c1+c2
        #print(consulta)
        cur.execute(consulta)
        CommitTransaction(cnn)

        datos = self.SimularCancion()

        actualizar="UPDATE Invoice SET Total ="+str(datos[1])+" where InvoiceId="+str(datos[0])+""
        cnn = BeginTransaction()
        cur = cnn.cursor()
        cur.execute(actualizar)
        CommitTransaction(cnn)

        EndTransaction(cnn)




    def SimularCancion(self):
        
        idV = self.encontrarVenta()
        npc = self.canciones[self.aleatorio(self.largoC)]
        total = 0
        consulta= "INSERT INTO InvoiceLine (InvoiceId, TrackId, UnitPrice, Quantity)" \
            " VALUES ("+str(idV)+", "+str(npc[0])+", "+str(npc[1])+", 1);"

        cnn = BeginTransaction()
        cur = cnn.cursor()

        cur.execute(consulta)
        CommitTransaction(cnn)

        total = npc[1]
        valores = [idV, total]

        return valores


    def encontrarVenta(self):
        cnn = BeginTransaction()
        cur = cnn.cursor()
        consulta = "select * from Invoice where total=-1.11"
        cur.execute(consulta)
        lista = cur.fetchall()
        if (len(lista) > 0):
            return  lista[0][0]
        return 1


    """
    def idInvoice(self):

        cnn = BeginTransaction()
        cur = cnn.cursor()
        consulta = "select Count(InvoiceId) from Invoice"
        cur.execute(consulta)

        lista = cur.fetchall()
        if (len(lista) > 0):
            self.idFactura=lista[0][0]
            print("idInvoice: "+str(lista[0][0]))

        EndTransaction(cnn)
    """

    def CargarCanciones(self):
        cnn = BeginTransaction()
        cur = cnn.cursor()
        consulta = "select * from track"
        cur.execute(consulta)

        lista = cur.fetchall()
        if (len(lista) > 0):
            for i in lista:
                self.canciones.append([str(i[0]), str(i[8])])
        else:
            print("Error al cargar usuarios")
        EndTransaction(cnn)

        self.largoC = len(self.canciones)

    def aleatorio(self, rango):
        return randint(0, rango-1)

    def cargarPlay(self):
        cnn = BeginTransaction()
        cur = cnn.cursor()
        consulta = "select * from BuyedTracks"
        cur.execute(consulta)

        lista = cur.fetchall()
        if (len(lista) > 0):
            for i in lista:
                self.play.append([str(i[0]), str(i[1])])
        else:
            print("Error al cargar usuarios")
        EndTransaction(cnn)
        self.largoP = len(self.play)




















