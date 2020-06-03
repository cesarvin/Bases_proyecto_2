
from ManejadorVenta import *

def menuPrincipal():
    fin = True
    print("__________________________")
    print("Bienvenido a IntelHalf")
    print("__________________________")
    while(fin):
        print("")
        print("(a). Simular venta y reproduccion de canciones")
        print("(b). Salir")
        print("")

        acction = input("Ingrese la letra de la opcion que desea ejecutar: ")

        if (acction=='a'):
            fecha = input("Ingrese la fecha (YYYY-MM-DD):")
            cant = input("Ingrese la cantidad de tracks:")
            opcionA(fecha, cant)
        elif (acction == 'b'):
            fin=False
        else:
            print("'"+acction+"' no es una opcion! Intente de nuevo")


def opcionA(fecha, cant):
    vender = GeneradorVentas()
    print("")
    print("__________________________")
    print("Iniciando la simulación...")

    for i in range(int(cant)):
        print(i)
        vender.SimularVenta(fecha)
        vender.SimularPlay()
    print("Simulación completa!")



