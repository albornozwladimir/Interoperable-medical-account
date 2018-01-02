Ficheros de ejemplo para la correcta comunicación con Endpoint-Cense
----------------------------------------------------------------------

+ En primera instancia se declaran esqueletos de JSON que permitirán la conexión entre app y el endpoint de Cense
+ Comunicacin va POST - Rest
+ Cabe destacar que la comunicación con el endpoint es solo con mensajes tipo HL7 2.X, por lo que si se desea utilizar mesajes con formato JSON deberán ser parseados con anterioridad.
+ La comunicación tiene la siguiente organización:
    Prestador  ->  Endpoint_Fonasa -> Prestador

Es recomendable utilizar algún servidor de integración como Mirth Connect.
