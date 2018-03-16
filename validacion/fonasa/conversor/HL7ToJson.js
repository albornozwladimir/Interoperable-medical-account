// Conversor para MirthConnect HL7 v2.x to JSON
// Para SOURCE TRANSFORMER con mensaje de entrada HL7 v2.x
// Se recomienda que se separe el código Javascript según cada segmento

// Functions
function ISODate(){
	var fecha = new Date();
	var anio = fecha.getUTCFullYear();
	var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
	var day = ("0" + fecha.getDate()).slice(-2);
	var hour = ("0" + fecha.getHours()).slice(-2);
	var minute = ("0" + fecha.getMinutes()).slice(-2);
	var second = ("0" + fecha.getSeconds()).slice(-2);
	var ISO = anio+''+month+''+day+''+hour+''+minute+''+second+'-0400';	
	return ISO;
}

tmp['MSH']['MSH.1'] = "|"; // Separador de campo
tmp['MSH']['MSH.2'] = "^~\&"; // Codificación de caracteres
tmp['MSH']['MSH.3']['MSH.3.1'] = "SW_FONASA"; // Nombre aplicación que envía
//MSH4
tmp['MSH']['MSH.4']['MSH.4.1'] = "0"; // Cod. establecimiento (Predefinido '0 Fonasa')
tmp['MSH']['MSH.4']['MSH.4.2'] = "616030000"; // Nro de documento
tmp['MSH']['MSH.4']['MSH.4.3'] = "RUT"; // Tipo de documento (Predefinido 'RUT')
//MSH5
tmp['MSH']['MSH.5']['MSH.5.1'] = "SW_ASC"; // Nombre aplicación destino
//MSH6
tmp['MSH']['MSH.6']['MSH.6.1'] = msg['MSH']['MSH.6']['MSH.6.1'].toString(); // Cod. Establecimiento 
tmp['MSH']['MSH.6']['MSH.6.2'] = msg['MSH']['MSH.6']['MSH.6.2'].toString(); // Rut Establecimiento
tmp['MSH']['MSH.6']['MSH.6.3'] = msg['MSH']['MSH.6']['MSH.6.3'].toString(); // Tipo de documento (Predefinido 'RUT', DEIS prestador público)
// MSH7
tmp['MSH']['MSH.7']['MSH.7.1'] = ISODate(); //Fecha-hora del mensaje(YYYYMMDDhhmmss[+,-]zzzz)
// MSH9
tmp['MSH']['MSH.9']['MSH.9.1'] = "BAR"; // Tipo msje.-Tabla 0076
tmp['MSH']['MSH.9']['MSH.9.2'] = "P01"; // Tipo evento-Tabla 0003
tmp['MSH']['MSH.9']['MSH.9.3'] = "BAR_P01"; // Estructura-Tabla 0354
// MSH10
tmp['MSH']['MSH.10']['MSH.10.1'] = msg['MSH']['MSH.10']['MSH.10.1'].toString(); // ID control (ej:000001)
// MSH11
tmp['MSH']['MSH.11']['MSH.11.1'] = "P"; // ID procesamiento ('P' estandár)
// MSH12
tmp['MSH']['MSH.12']['MSH.12.1'] = "2.5.1"; // ID de versión

//ENV1
tmp['EVN']['EVN.1']['EVN.1.1'] = "P01";// Tipo de evento (tabla 18-HL7 0003)
tmp['EVN']['EVN.2']['EVN.2.1'] = ISODate();// Hora-Fecha del evento (YYYYMMDDhhmmss[+-]ZZZZ)

//PID3 - Identificación Usuario
//RutSinDigito^DígitoVerificador^^EntidadEmisoraRut^TipoDocumento^^^^CodPais&Pais&NormaCodificacionPais
//Ejemplo: 123456789^0^^RegistroCivil^NI^^^^152&Chile&ISO3166-1
tmp['PID']['PID.3']['PID.3.1'] = msg['PID']['PID.3']['PID.3.1'].toString();// Rut sin dígito verificador
tmp['PID']['PID.3']['PID.3.2'] = msg['PID']['PID.3']['PID.3.2'].toString();// Dígito verificador
tmp['PID']['PID.3']['PID.3.4'] = "AA_RegistroCivil";// Entidad que emite el RUN (AA_RegistroCivil)
tmp['PID']['PID.3']['PID.3.5'] = msg['PID']['PID.3']['PID.3.5'].toString();// Tipo de documento [NI](Tabla HL7 0203)
tmp['PID']['PID.3']['PID.3.9']['PID.3.9.1'] = "152";// Código de país
tmp['PID']['PID.3']['PID.3.9']['PID.3.9.2'] = "Chile";// País
tmp['PID']['PID.3']['PID.3.9']['PID.3.9.3'] = "ISO3166-1";// Norma codificación país

//PID5 - Identificación beneficiario
tmp['PID']['PID.5']['PID.5.1'] = msg['PID']['PID.5']['PID.5.1'].toString();// Primer apellido
tmp['PID']['PID.5']['PID.5.2'] = msg['PID']['PID.5']['PID.5.2'].toString();// Primer nombre
tmp['PID']['PID.5']['PID.5.3'] = msg['PID']['PID.5']['PID.5.3'].toString();// Segundo nombre
//PID6
tmp['PID']['PID.6']['PID.6.1'] = msg['PID']['PID.6']['PID.6.1'].toString();// Segundo apellido

//PV1
tmp['PV1']['PV1.2']['PV1.2.1'] = msg['PV1']['PV1.2']['PV1.2.1'].toString(); //Tipo de encuentro [1,2,3] Tabla 0004
tmp['PV1']['PV1.5']['PV1.5.1'] = msg['PV1']['PV1.5']['PV1.5.1'].toString();// Id de paciente entregado por Hospital
tmp['PV1']['PV1.7']['PV1.7.1'] = msg['PV1']['PV1.7']['PV1.7.1'].toString(); //Run medico tratante y/o equipo (Solo ambulatorio, Hosp y Emergencia no aplica)
tmp['PV1']['PV1.8'] = msg['PV1']['PV1.8']['PV1.8.1'].toString();//Run médico que refiere hospitalización (No aplica en ambulatorio[Vacío])
tmp['PV1']['PV1.18'] = msg['PV1']['PV1.18']['PV1.18.1'].toString(); //Marca de gratuidad
tmp['PV1']['PV1.19']['PV1.19.1'] = msg['PV1']['PV1.19']['PV1.19.1'].toString();//ID encuentro fonasa(Generado por fonasa)
tmp['PV1']['PV1.20']['PV1.20.1'] = msg['PV1']['PV1.20']['PV1.20.1'].toString();//Tramo beneficiario ([T23]Tabla 0064)

//PR1
tmp['PR1']['PR1.1']['PR1.1.1'] = msg['PR1']['PR1.1']['PR1.1.1'].toString();//Número de transacción(incremental)
tmp['PR1']['PR1.2'] = []; //Vacío
tmp['PR1']['PR1.3']['PR1.3.1'] = msg['PR1']['PR1.3']['PR1.3.1'].toString();//Código tipo de encuentro (tabla 0004)
tmp['PR1']['PR1.4'] = []; //Vacío
tmp['PR1']['PR1.5']['PR1.5.1'] = ISODate();//Hora-Fecha del evento (YYYYMMDDhhmmss[+-]ZZZZ)

tmp['IN1']['IN1.1']['IN1.1.1'] = msg['IN1']['IN1.1']['IN1.1.1'].toString();//Contador de segmento(predeterminado 1)
tmp['IN1']['IN1.2']['IN1.2.1'] = msg['IN1']['IN1.2']['IN1.2.1'].toString();//Leyes provisionales ([T27]Tabla 0072-Leyes provisionales)
tmp['IN1']['IN1.3']['IN1.3.1'] = msg['IN1']['IN1.3']['IN1.3.1'].toString();//Previsión (Tabla 28 DEIS:Decreto ex.643/2016)