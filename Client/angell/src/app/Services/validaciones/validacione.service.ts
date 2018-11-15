import { Injectable } from '@angular/core';

@Injectable()
export class ValidacioneService {

  constructor() {

  }

  validateEmail(email) {
    const re = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return re.test(email);
  }

  validateRucCedula(campo) {
    if (campo.length > 9) {
      var numero = campo;
      var suma = 0;
      var residuo = 0;
      var pri = false;
      var pub = false;
      var nat = false;
      var modulo = 11;

      /* Aqui almacenamos los digitos de la cedula en variables. */
      var d1 = numero.substring(0, 1);
      var d2 = numero.substring(1, 2);
      var d3 = numero.substring(2, 3);
      var d4 = numero.substring(3, 4);
      var d5 = numero.substring(4, 5);
      var d6 = numero.substring(5, 6);
      var d7 = numero.substring(6, 7);
      var d8 = numero.substring(7, 8);
      var d9 = numero.substring(8, 9);
      var d10 = numero.substring(9, 10);

      // comparo que el numero de provincias sean los correctos (24 para ecuador).  
      if (numero.substring(0, 2) > 24) {
        return false;
      }

      /* El tercer digito es: */
      /* 9 para sociedades privadas y extranjeros */
      /* 6 para sociedades publicas */
      /* menor que 6 (0,1,2,3,4,5) para personas naturales */

      if (d3 == 7 || d3 == 8) {
        // alert('El tercer dígito ingresado es inválido');
        return false;
      }

      /* Solo para personas naturales (modulo 10) */
      if (d3 < 6) {
        nat = true;
        var p1 = d1 * 2; if (p1 >= 10) p1 -= 9;
        var p2 = d2 * 1; if (p2 >= 10) p2 -= 9;
        var p3 = d3 * 2; if (p3 >= 10) p3 -= 9;
        var p4 = d4 * 1; if (p4 >= 10) p4 -= 9;
        var p5 = d5 * 2; if (p5 >= 10) p5 -= 9;
        var p6 = d6 * 1; if (p6 >= 10) p6 -= 9;
        var p7 = d7 * 2; if (p7 >= 10) p7 -= 9;
        var p8 = d8 * 1; if (p8 >= 10) p8 -= 9;
        var p9 = d9 * 2; if (p9 >= 10) p9 -= 9;
        modulo = 10;
      }

      /* Solo para sociedades publicas (modulo 11) */
      /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
      else if (d3 == 6) {
        pub = true;
        p1 = d1 * 3;
        p2 = d2 * 2;
        p3 = d3 * 7;
        p4 = d4 * 6;
        p5 = d5 * 5;
        p6 = d6 * 4;
        p7 = d7 * 3;
        p8 = d8 * 2;
        p9 = 0;
      }

      /* Solo para entidades privadas (modulo 11) */
      else if (d3 == 9) {
        pri = true;
        p1 = d1 * 4;
        p2 = d2 * 3;
        p3 = d3 * 2;
        p4 = d4 * 7;
        p5 = d5 * 6;
        p6 = d6 * 5;
        p7 = d7 * 4;
        p8 = d8 * 3;
        p9 = d9 * 2;
      }

      suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
      residuo = suma % modulo;

      /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
      var digitoVerificador = residuo == 0 ? 0 : modulo - residuo;

      /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/
      if (pub == true) {
        if (digitoVerificador != d9) {
          // alert('El ruc de la empresa del sector público es incorrecto.');
          return false;
        }
        /* El ruc de las empresas del sector publico terminan con 0001*/
        if (numero.substring(9, 4) != '0001') {
          // alert('El ruc de la empresa del sector público debe terminar con 0001');
          return false;
        }
      }
      else if (pri == true) {
        if (digitoVerificador != d10) {
          // alert('El ruc de la empresa del sector privado es incorrecto.');
          return false;
        }
        // verificar esta parte con los demas RUC
        if (numero.length > 10 && (numero.substring(13, 10) != '001' && numero.substring(13, 10) != '002' &&
          numero.substring(13, 10) != '003' && numero.substring(13, 10) != '004' && numero.substring(13, 10) != '005' &&
          numero.substring(13, 10) != '006' && numero.substring(13, 10) != '007' && numero.substring(13, 10) != '008' &&
          numero.substring(13, 10) != '009')) {
          // alert('El ruc de la empresa del sector privado debe terminar con 001');
          return false;
        }
      }

      else if (nat == true) {
        if (digitoVerificador != d10) {
          // alert('El número de cédula de la persona natural es incorrecto.');
          return false;
        }

        if (numero.length > 10 && (numero.substring(13, 10) != '001' && numero.substring(13, 10) != '002' &&
          numero.substring(13, 10) != '003' && numero.substring(13, 10) != '004' && numero.substring(13, 10) != '005' &&
          numero.substring(13, 10) != '006' && numero.substring(13, 10) != '007' && numero.substring(13, 10) != '008' &&
          numero.substring(13, 10) != '009')) {
          // alert('El ruc de la persona natural debe terminar con 00*');
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  validateTelefono(telefono) {
    if (telefono.length !== 10 && telefono.length !== 9) {
      return false;
    } else {
      return true;
    }
  }

  validateNombres(nombres) {
    if (nombres.length < 8) {
      return false;
    } else {
      return true;
    }
  }

  validateDireccion(direccion) {
    if (direccion.length < 4) {
      return false;
    } else {
      return true;
    }
  }

}
