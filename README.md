Ficheros de ejemplo para la correcta comunicación con Endpoint-Cense que permite la interoperabilidad en una cuenta medica.

En primera instancia se declaran esqueletos de JSON que permitirán la conexión entre app y el endpoint de Cense, comunicación via http REST - POST.
Cabe destacar que la comunicación con el endpoint es solo con mensajes tipo HL7 2.X, por lo que si se desea utilizar mesajes con formato JSON se deberán parsear antes.


La comunicación tiene la siguiente organización:

Aplicación  ->  Endpoint -> Aplicación

