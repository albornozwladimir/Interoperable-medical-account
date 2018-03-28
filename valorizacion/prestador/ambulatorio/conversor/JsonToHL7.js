// Conversor para MirthConnect JSON a HL7v2.X - Valorización CMI
// Para Source Transformer - Mirth Connect

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

//MSH
tmp['MSH']['MSH.1'] = "|"; // Separador de campo
tmp['MSH']['MSH.2'] = "^~\\&"; // Codificación de caracteres
tmp['MSH']['MSH.3']['MSH.3.1'] = "SW_ASC"; // Nombre aplicación que envía
//MSH4
tmp['MSH']['MSH.4']['MSH.4.1'] = msg['MSH']['MSH.4']['MSH.4.1']; // Cod. establecimiento que envía(Predefinido '0 Fonasa')
tmp['MSH']['MSH.4']['MSH.4.2'] = msg['MSH']['MSH.4']['MSH.4.2']; // Nro de documento
tmp['MSH']['MSH.4']['MSH.4.3'] = msg['MSH']['MSH.4']['MSH.4.3']; // Tipo de documento (Predefinido 'RUT', 'DEIS' para prestador público)
//MSH5
tmp['MSH']['MSH.5']['MSH.5.1'] = "SW_FONASA"; // Nombre aplicación destino
//MSH6
tmp['MSH']['MSH.6']['MSH.6.1'] = "0"; // Cod. Establecimiento que recibe(Predefinido '0' Fonasa)  
tmp['MSH']['MSH.6']['MSH.6.2'] = "616030000"; // Rut Fonasa (predefinido 616030000)
tmp['MSH']['MSH.6']['MSH.6.3'] = "RUT"; // Tipo de documento (Predefinido 'RUT')
// MSH7
tmp['MSH']['MSH.7']['MSH.7.1'] = ISODate(); //Fecha-hora del mensaje(YYYYMMDDhhmmss[+,-]zzzz)
// MSH8
//tmp['MSH']['MSH.8']['MSH.8.1'] = msg['MSH']['MSH.8']; //vacío
// MSH9
tmp['MSH']['MSH.9']['MSH.9.1'] = "ADT"; // Tipo msje.-Tabla 0076 - ADT para validación
tmp['MSH']['MSH.9']['MSH.9.2'] = "A01"; // Tipo evento-Tabla 0003
tmp['MSH']['MSH.9']['MSH.9.3'] = "ADT_A01"; // Estructura-Tabla 0354
// MSH10
tmp['MSH']['MSH.10']['MSH.10.1'] = msg['MSH']['MSH.10']['MSH.10.1']; // ID control (ej:000001)
// MSH11
tmp['MSH']['MSH.11']['MSH.11.1'] = "P"; // ID procesamiento ('P' estandár)
// MSH12
tmp['MSH']['MSH.12']['MSH.12.1'] = "2.5.1"; // ID de versión

//ENV1
tmp['EVN']['EVN.1']['EVN.1.1'] = "A01";// Tipo de evento (tabla 18-HL7 0003)
tmp['EVN']['EVN.2']['EVN.2.1'] = ISODate();// Hora-Fecha del evento (YYYYMMDDhhmmss[+-]ZZZZ)

//PID
//PID3 - Identificación Usuario
//RutSinDigito^DígitoVerificador^^EntidadEmisoraRut^TipoDocumento^^^^CodPais&Pais&NormaCodificacionPais
//Ejemplo: 123456789^0^^RegistroCivil^NI^^^^152&Chile&ISO3166-1
tmp['PID']['PID.3']['PID.3.1'] = msg['PID']['PID.3']['PID.3.1'];// Rut sin dígito verificador
tmp['PID']['PID.3']['PID.3.2'] = msg['PID']['PID.3']['PID.3.2'];// Dígito verificador
tmp['PID']['PID.3']['PID.3.4'] = "AA_RegistroCivil";// Entidad que emite el RUN, A espera de OID el predeterminado será RegistroCivil
tmp['PID']['PID.3']['PID.3.5'] = msg['PID']['PID.3']['PID.3.5'];// Tipo de documento [NI](Tabla HL7 0203)
tmp['PID']['PID.3']['PID.3.9']['PID.3.9.1'] = "152";// Código de país '152'
tmp['PID']['PID.3']['PID.3.9']['PID.3.9.2'] = "Chile";// País
tmp['PID']['PID.3']['PID.3.9']['PID.3.9.3'] = "ISO3166-1";// Norma codificación país
//PID5 - Identificación beneficiario
tmp['PID']['PID.5']['PID.5.1'] = msg['PID']['PID.5']['PID.5.1'];// Primer apellido
tmp['PID']['PID.5']['PID.5.2'] = msg['PID']['PID.5']['PID.5.2'];// Primer nombre
tmp['PID']['PID.5']['PID.5.3'] = msg['PID']['PID.5']['PID.5.3'];// Segundo nombre
//PID6
tmp['PID']['PID.6']['PID.6.1'] = msg['PID']['PID.6']['PID.6.1'];// Segundo apellido

//PV1
tmp['PV1']['PV1.2']['PV1.2.1'] = msg['PV1']['PV1.2']['PV1.2.1']; //Tipo de encuentro [1,2,3] Tabla 0004
tmp['PV1']['PV1.5']['PV1.5.1'] = msg['PV1']['PV1.5']['PV1.5.1'];// Id de paciente entregado por Hospital
tmp['PV1']['PV1.7']['PV1.7.1'] = msg['PV1']['PV1.7']['PV1.7.1']; //Run medico tratante y/o equipo (Solo ambulatorio, Hosp y Emergencia no aplica)

//PR1
tmp['PR1']['PR1.1']['PR1.1.1'] = msg['PR1']['PR1.1']['PR1.1.1'];//Número de transacción(incremental)
tmp['PR1']['PR1.3']['PR1.3.1'] = msg['PR1']['PR1.3']['PR1.3.1'];//Código tipo de encuentro (tabla 0004)
tmp['PR1']['PR1.5']['PR1.5.1'] = ISODate();//Hora-Fecha del evento (YYYYMMDDhhmmss[+-]ZZZZ)

//IN1
tmp['IN1']['IN1.1']['IN1.1.1'] = "1";//Contador de segmento(predeterminado 1)
tmp['IN1']['IN1.2']['IN1.2.1'] = msg['IN1']['IN1.2']['IN1.2.1'];//Leyes provisionales ([T27]Tabla 0072-Leyes provisionales)
tmp['IN1']['IN1.3']['IN1.3.1'] = msg['IN1']['IN1.3']['IN1.3.1'];//Previsión (Tabla 28 DEIS:Decreto ex.643/2016)
