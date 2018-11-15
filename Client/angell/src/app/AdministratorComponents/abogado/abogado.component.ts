import { Component, OnInit } from '@angular/core';
import { AbogadoService } from '../../Services/abogado/abogado.service';
import { ValidacioneService } from '../../Services/validaciones/validacione.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-abogado',
  templateUrl: './abogado.component.html',
  styleUrls: ['./abogado.component.css']
})
export class AbogadoComponent implements OnInit {

  //#region VARIABLES CREADAS
  abogado = {
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: '',
    mail: '',
    sexo: '0',
    estado: '0',
    foto: ''
  };
  selectAbogado = {
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: '',
    mail: '',
    sexo: '0',
    estado: '0',
    foto: ''
  };
  bandera = {
    ban1: '0',
    ban2: '0',
    ban3: '0',
    ban4: '0',
    ban5: '0'
  };

  fileImagen: File = null;
  listaAbogado: any = [];
  selectSexo: any = '';
  selectEstado: any = '0';
  cols: any = [];
  showDialog: boolean;
  showDialogMod: boolean;
  urlImagen: any = 'assets/perfil.png';
  uploadedFiles: any;
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    public abogadoService: AbogadoService,
    public validarService: ValidacioneService,
    public notifyService: NotificacionesService
  ) {
    this.cols = [
      { field: 'cedula', header: 'Cédula' },
      { field: 'nombre', header: 'Nombres' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'mail', header: 'Email' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'estado', header: 'Estado' },
    ];
    this.inicio();
  }
  //#endregion

  //#region INICIO DE VARIABLES
  inicio() {
    this.abogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.selectAbogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.bandera = {
      ban1: '0',
      ban2: '0',
      ban3: '0',
      ban4: '0',
      ban5: '0'
    };

    this.listaAbogado = [];
    this.showDialog = false;
    this.showDialogMod = false;
    this.selectEstado = true;
    this.selectSexo = true;
    this.urlImagen = 'assets/perfil.png';

    this.abogadoService.listAbogado().subscribe(data => {
      const aux: any = data;
      for (const cli of aux) {
        if (cli.sexo === '0') {
          cli.sexo = 'Hombre';
        } else {
          cli.sexo = 'Mujer';
        }
        if (cli.estado === '0') {
          cli.estado = 'Activo';
          this.listaAbogado.push(cli);
        } else {
          cli.estado = 'Inactivo';
          this.listaAbogado.push(cli);
        }
      }
    }, err => {
      console.log(err);
    });
  }
  ngOnInit() {

  }
  //#endregion

  //#region INGRESO Y MODIFICACION
  // Añadir un abogado
  addAbogado() {
    if (this.bandera.ban1 === '1' && this.bandera.ban2 === '1' && this.bandera.ban3 === '1' && this.bandera.ban4 === '1' &&
      this.bandera.ban5 === '1') {
      this.abogado.foto = this.urlImagen;
      if (this.selectSexo === true) {
        this.abogado.sexo = '0';
      } else {
        this.abogado.sexo = '1';
      }
      this.abogadoService.addAbogado(this.abogado).subscribe(dat => {
        this.showDialog = false;
        this.inicio();
        this.notifyService.notify('success', 'Exito', 'Ingreso existoso!');
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'Abogado ya existe!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Revise Campos!');
    }
  }
  // Modificar un abogado
  updateAbogado() {
    if (this.bandera.ban1 === '1' && this.bandera.ban2 === '1' && this.bandera.ban3 === '1' && this.bandera.ban4 === '1' &&
      this.bandera.ban5 === '1') {
      this.selectAbogado.foto = this.urlImagen;
      if (this.selectSexo === true) {
        this.selectAbogado.sexo = '0';
      } else {
        this.selectAbogado.sexo = '1';
      }
      if (this.selectEstado === true) {
        this.selectAbogado.estado = '0';
      } else {
        this.selectAbogado.estado = '1';
      }
      this.abogadoService.updateAbogado(this.selectAbogado).subscribe(data => {
        this.showDialogMod = false;
        this.inicio();
        this.notifyService.notify('success', 'Exito', 'Modificación existosa!');
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'Abogado ya existe!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Revise campos!');
    }
  }
  //#endregion

  //#region CARGAR IMAGEN Y CERRAR, ABRIR FORMULARIO
  // Cerrar formulario
  cancelar() {
    this.selectAbogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.abogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.showDialog = false;
    this.showDialogMod = false;
    this.inicio();
  }
  // Cargar imagen
  cargaImagen(file: FileList) {
    this.fileImagen = file.item(0);
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.urlImagen = event.target.result;
    };
    reader.readAsDataURL(this.fileImagen);
  }
  // Mostrar formulario de ingreso.
  showDialogAdd() {
    document.getElementById('cedula').style.borderColor = '';
    document.getElementById('nombre').style.borderColor = '';
    document.getElementById('telefono').style.borderColor = '';
    document.getElementById('mail').style.borderColor = '';
    document.getElementById('direccion').style.borderColor = '';
    this.abogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.selectAbogado = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: ''
    };
    this.bandera = {
      ban1: '0',
      ban2: '0',
      ban3: '0',
      ban4: '0',
      ban5: '0'
    };
    this.showDialog = true;
    this.selectEstado = true;
    this.selectSexo = true;
    this.urlImagen = 'assets/perfil.png';
  }

  // cargar datos de la seleccion de una fila de la tabla y mostrar el formulario de modificar
  onRowSelect(event) {
    document.getElementById('cedulaMod').style.borderColor = '';
    document.getElementById('nombreMod').style.borderColor = '';
    document.getElementById('telefonoMod').style.borderColor = '';
    document.getElementById('mailMod').style.borderColor = '';
    document.getElementById('direccionMod').style.borderColor = '';
    this.bandera = {
      ban1: '1',
      ban2: '1',
      ban3: '1',
      ban4: '1',
      ban5: '1'
    };
    this.selectAbogado = event.data;
    this.urlImagen = event.data.foto;
    if (event.data.sexo === 'Hombre') {
      this.selectSexo = true;
    } else {
      this.selectSexo = false;
    }
    if (event.data.estado === 'Activo') {
      this.selectEstado = true;
    } else {
      this.selectEstado = false;
    }
    this.showDialogMod = true;
  }
  //#endregion

  //#region  VALIDACIONES
  // Verifca la cedula
  verificaCedula() {
    if (this.abogado.cedula !== '') {
      if (!this.validarService.validateRucCedula(this.abogado.cedula)) {
        document.getElementById('cedula').style.borderColor = '#FE2E2E';
        this.bandera.ban1 = '0';
      } else {
        document.getElementById('cedula').style.borderColor = '#5ff442'; // green
        this.bandera.ban1 = '1';
        console.log(this.bandera);
      }
    }
    if (this.selectAbogado.cedula !== '') {
      if (!this.validarService.validateRucCedula(this.selectAbogado.cedula)) {
        document.getElementById('cedulaMod').style.borderColor = '#FE2E2E';
        this.bandera.ban1 = '0';
      } else {
        document.getElementById('cedulaMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban1 = '1';
      }
    }
  }
  // verifica numero de telefono
  verificaTelefono() {
    if (this.abogado.telefono !== '') {
      if (!this.validarService.validateTelefono(this.abogado.telefono)) {
        document.getElementById('telefono').style.borderColor = '#FE2E2E';
        this.bandera.ban2 = '0';
      } else {
        document.getElementById('telefono').style.borderColor = '#5ff442'; // green
        this.bandera.ban2 = '1';
        console.log(this.bandera);
      }
    }
    if (this.selectAbogado.telefono !== '') {
      if (!this.validarService.validateTelefono(this.selectAbogado.telefono)) {
        document.getElementById('telefonoMod').style.borderColor = '#FE2E2E';
        this.bandera.ban2 = '0';
      } else {
        document.getElementById('telefonoMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban2 = '1';
      }
    }
  }
  // verifica email
  verificaEmail() {
    if (this.abogado.mail !== '') {
      if (!this.validarService.validateEmail(this.abogado.mail)) {
        document.getElementById('mail').style.borderColor = '#FE2E2E';
        this.bandera.ban3 = '0';
      } else {
        document.getElementById('mail').style.borderColor = '#5ff442'; // green
        this.bandera.ban3 = '1';
        console.log(this.bandera);
      }
    }
    if (this.selectAbogado.mail !== '') {
      if (!this.validarService.validateEmail(this.selectAbogado.mail)) {
        document.getElementById('mailMod').style.borderColor = '#FE2E2E';
        this.bandera.ban3 = '0';
      } else {
        document.getElementById('mailMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban3 = '1';
      }
    }
  }
  // verifica Nombres
  verificaNombres() {
    if (this.abogado.nombre !== '') {
      if (!this.validarService.validateNombres(this.abogado.nombre)) {
        document.getElementById('nombre').style.borderColor = '#FE2E2E';
        this.bandera.ban4 = '0';
      } else {
        document.getElementById('nombre').style.borderColor = '#5ff442'; // green
        this.bandera.ban4 = '1';
        console.log(this.bandera);
      }
    }
    if (this.selectAbogado.nombre !== '') {
      if (!this.validarService.validateNombres(this.selectAbogado.nombre)) {
        document.getElementById('nombreMod').style.borderColor = '#FE2E2E';
        this.bandera.ban4 = '0';
      } else {
        document.getElementById('nombreMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban4 = '1';
      }
    }
  }
  // verifica dirección
  verificaDireccion() {
    if (this.abogado.direccion !== '') {
      if (!this.validarService.validateDireccion(this.abogado.direccion)) {
        document.getElementById('direccion').style.borderColor = '#FE2E2E';
        this.bandera.ban5 = '0';
      } else {
        document.getElementById('direccion').style.borderColor = '#5ff442'; // green
        this.bandera.ban5 = '1';
        console.log(this.bandera);
      }
    }
    if (this.selectAbogado.direccion !== '') {
      if (!this.validarService.validateDireccion(this.selectAbogado.direccion)) {
        document.getElementById('direccionMod').style.borderColor = '#FE2E2E';
        this.bandera.ban5 = '0';
      } else {
        document.getElementById('direccionMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban5 = '1';
      }
    }
  }
  //#endregion

}
