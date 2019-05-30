import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../Services/cliente/cliente.service';
import { ValidacioneService } from '../../Services/validaciones/validacione.service';
import { NotificacionesService } from '../../Services/notificaciones/notificaciones.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  //#region VARIABLES CREADAS
  cliente = {
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: '',
    mail: '',
    sexo: '0',
    estado: '0',
    foto: '',
    numeroCarpeta: ''
  };
  selectCliente = {
    nombre: '',
    cedula: '',
    direccion: '',
    telefono: '',
    mail: '',
    sexo: '0',
    estado: '0',
    foto: '',
    numeroCarpeta: ''
  };
  bandera = {
    ban1: '0',
    ban2: '0',
    ban3: '0',
    ban4: '0',
    ban5: '0',
    ban6: '0',
  };
  fileImagen: File = null;
  listaCliente: any = [];
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
    public clienteService: ClienteService,
    public validarService: ValidacioneService,
    public notifyService: NotificacionesService
  ) {
    this.cols = [];
    this.inicio();
  }
  //#endregion

  //#region INICIALIZAR VARIABLES
  inicio() {
    this.inicializarCampos();
    this.bandera = {
      ban1: '0',
      ban2: '0',
      ban3: '0',
      ban4: '0',
      ban5: '0',
      ban6: '0',
    };
    this.listaCliente = [];
    this.showDialog = false;
    this.showDialogMod = false;
    this.selectEstado = true;
    this.selectSexo = true;
    this.urlImagen = 'assets/perfil.png';

    this.clienteService.listCliente().subscribe(data => {
      const d: any = data;
      for (const cli of d) {
        if (cli.sexo === '0') {
          cli.sexo = 'Hombre';
        } else {
          cli.sexo = 'Mujer';
        }
        if (cli.estado === '0') {
          cli.estado = 'Activo';
          this.listaCliente.push(cli);
        } else {
          cli.estado = 'Inactivo';
          this.listaCliente.push(cli);
        }
      }
    }, err => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.cols = [
      { field: 'cedula', header: 'Cédula' },
      { field: 'nombre', header: 'Nombres' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'mail', header: 'Email' },
      { field: 'numeroCarpeta', header: 'No. Carpeta' },
      { field: 'sexo', header: 'Sexo' },
      { field: 'estado', header: 'Estado' },
    ];
  }
  //#endregion

  //#region INGRESO Y MADIFICAR CLIENTE
  // Añadir un cliente
  addCliente() {
    if (this.bandera.ban1 === '1' && this.bandera.ban2 === '1' && this.bandera.ban3 === '1' && this.bandera.ban4 === '1' &&
      this.bandera.ban5 === '1' && this.bandera.ban6 === '1') {
      this.cliente.foto = this.urlImagen;
      if (this.selectSexo === true) {
        this.cliente.sexo = '0';
      } else {
        this.cliente.sexo = '1';
      }
      this.clienteService.addCliente(this.cliente).subscribe(data => {
        this.showDialog = false;
        this.notifyService.notify('success', 'Exito', 'Ingreso Existoso!');
        this.inicio();
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'Cliente ya existe!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Revise Campos!');
    }
  }
  // Modificar un cliente
  updateCliente() {
    if (this.bandera.ban1 === '1' && this.bandera.ban2 === '1' && this.bandera.ban3 === '1' && this.bandera.ban4 === '1' &&
      this.bandera.ban5 === '1') {
      this.selectCliente.foto = this.urlImagen;
      if (this.selectSexo === true) {
        this.selectCliente.sexo = '0';
      } else {
        this.selectCliente.sexo = '1';
      }
      if (this.selectEstado === true) {
        this.selectCliente.estado = '0';
      } else {
        this.selectCliente.estado = '1';
      }
      this.clienteService.updateCliente(this.selectCliente).subscribe(data => {
        this.showDialogMod = false;
        this.inicio();
        this.notifyService.notify('success', 'Exito', 'Modificación Existosa!');
      }, err => {
        this.notifyService.notify('error', 'ERROR', 'Cliente ya Existe!');
      });
    } else {
      this.notifyService.notify('error', 'ERROR', 'Revise Campos!');
    }
  }
  //#endregion

  //#region CARGAR Y MOSTRAR FORMULARIOS
  // inicializar Objetos
  inicializarCampos() {
    this.selectCliente = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: '',
      numeroCarpeta: ''
    };
    this.cliente = {
      nombre: '',
      cedula: '',
      direccion: '',
      telefono: '',
      mail: '',
      sexo: '0',
      estado: '0',
      foto: '',
      numeroCarpeta: ''
    };
  }
  // Cerrar formulario
  cancelar() {
    this.inicializarCampos();
    this.showDialog = false;
    this.showDialogMod = false;
    // this.inicio();
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
    this.inicializarCampos();
    this.bandera = {
      ban1: '0',
      ban2: '0',
      ban3: '0',
      ban4: '0',
      ban5: '0',
      ban6: '0',
    };
    this.selectEstado = true;
    this.selectSexo = true;
    this.urlImagen = 'assets/perfil.png';
    this.showDialog = true;
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
      ban5: '1',
      ban6: '1',
    };
    this.selectCliente = event.data;
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

  //#region VALICADION DE CAMPOS
  // Verifca la cedula
  verificaCedula() {
    if (this.cliente.cedula !== '') {
      if (!this.validarService.validateRucCedula(this.cliente.cedula)) {
        document.getElementById('cedula').style.borderColor = '#FE2E2E';
        this.bandera.ban1 = '0';
      } else {
        document.getElementById('cedula').style.borderColor = '#5ff442'; // green
        this.bandera.ban1 = '1';
      }
    }
    if (this.selectCliente.cedula !== '') {
      if (!this.validarService.validateRucCedula(this.selectCliente.cedula)) {
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
    if (this.cliente.telefono !== '') {
      if (!this.validarService.validateTelefono(this.cliente.telefono)) {
        document.getElementById('telefono').style.borderColor = '#FE2E2E';
        this.bandera.ban2 = '0';
      } else {
        document.getElementById('telefono').style.borderColor = '#5ff442'; // green
        this.bandera.ban2 = '1';
      }
    }
    if (this.selectCliente.telefono !== '') {
      if (!this.validarService.validateTelefono(this.selectCliente.telefono)) {
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
    if (this.cliente.mail !== '') {
      if (!this.validarService.validateEmail(this.cliente.mail)) {
        document.getElementById('mail').style.borderColor = '#FE2E2E';
        this.bandera.ban3 = '0';
      } else {
        document.getElementById('mail').style.borderColor = '#5ff442'; // green
        this.bandera.ban3 = '1';
      }
    }
    if (this.selectCliente.mail !== '') {
      if (!this.validarService.validateEmail(this.selectCliente.mail)) {
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
    if (this.cliente.nombre !== '') {
      if (!this.validarService.validateNombres(this.cliente.nombre)) {
        document.getElementById('nombre').style.borderColor = '#FE2E2E';
        this.bandera.ban4 = '0';
      } else {
        document.getElementById('nombre').style.borderColor = '#5ff442'; // green
        this.bandera.ban4 = '1';
      }
    }
    if (this.selectCliente.nombre !== '') {
      if (!this.validarService.validateNombres(this.selectCliente.nombre)) {
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
    if (this.cliente.direccion !== '') {
      if (!this.validarService.validateDireccion(this.cliente.direccion)) {
        document.getElementById('direccion').style.borderColor = '#FE2E2E';
        this.bandera.ban5 = '0';
      } else {
        document.getElementById('direccion').style.borderColor = '#5ff442'; // green
        this.bandera.ban5 = '1';
      }
    }
    if (this.selectCliente.direccion !== '') {
      if (!this.validarService.validateDireccion(this.selectCliente.direccion)) {
        document.getElementById('direccionMod').style.borderColor = '#FE2E2E';
        this.bandera.ban5 = '0';
      } else {
        document.getElementById('direccionMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban5 = '1';
      }
    }
  }
  // verifica numero carpeta
  verificaNumeroCarpeta() {
    if (this.cliente.numeroCarpeta !== '' || this.cliente.numeroCarpeta === '') {
      if (this.cliente.numeroCarpeta.length < 1) {
        document.getElementById('numCarpeta').style.borderColor = '#FE2E2E';
        this.bandera.ban6 = '0';
      } else {
        document.getElementById('numCarpeta').style.borderColor = '#5ff442'; // green
        this.bandera.ban6 = '1';
      }
    } else if (this.selectCliente.numeroCarpeta !== '' || this.selectCliente.numeroCarpeta === '') {
      if (this.selectCliente.numeroCarpeta.length < 1) {
        document.getElementById('numCarpetaMod').style.borderColor = '#FE2E2E';
        this.bandera.ban6 = '0';
      } else {
        document.getElementById('numCarpetaMod').style.borderColor = '#5ff442'; // green
        this.bandera.ban6 = '1';
      }
    }
  }
  //#endregion
}
