import { Injectable } from '@angular/core';

@Injectable()
export class BotonesService {

  constructor() { }

  // Bloqueo de Campos
  bloquearCamposAdministrador: any = {
    blockFechIni: false,
    blockFechFin: false,
    blockCaso: false,
    blockPrecio: false,
    blockCliente: true,
    blockAbogado: false,
    blockDescripcionAdmin: false,
    blockDescripcionAbogado: true,
    blockDescripcionCliente: true,
    blockEstado: false,
    blockHoraInicio: false,
    blockActividad: false,
    blockValidar: false,

  };

  bloquearCamposAbogado: any = {
    blockFechIni: true,
    blockFechFin: true,
    blockCaso: true,
    blockPrecio: true,
    blockCliente: true,
    blockAbogado: true,
    blockDescripcionAdmin: true,
    blockDescripcionAbogado: false,
    blockDescripcionCliente: false,
    blockEstado: false,
    blockHoraInicio: true,
    blockActividad: true,
    blockValidar: true,
  };

  bloquearCamposCliente: any = {
    blockFechIni: true,
    blockFechFin: true,
    blockCaso: true,
    blockPrecio: true,
    blockCliente: true,
    blockAbogado: true,
    blockDescripcionAdmin: true,
    blockDescripcionAbogado: true,
    blockDescripcionCliente: true,
    blockEstado: true,
    blockHoraInicio: true,
    blockActividad: true,
    blockValidar: true,
  }

  // Campos que se puende visualizar.
  visibleCamposAdministrador: any = {
    showFechIni: true,
    showFechFin: true,
    showNumCarpeta: true,
    showCaso: true,
    showPrecio: true,
    showCliente: true,
    showAbogado: true,
    showDescripcionAdmin: true,
    showDescripcionAbogado: true,
    showDescripcionCliente: true,
    showEstado: true,
    showHoraInicio: true,
    showActividad: true,
    showValidar: true,
    showAddImagen: true,
    showSaveImagen: true,
  };

  visibleCamposAbogado: any = {
    showFechIni: true,
    showFechFin: true,
    showNumCarpeta: true,
    showCaso: true,
    showPrecio: true,
    showCliente: true,
    showAbogado: true,
    showDescripcionAdmin: true,
    showDescripcionAbogado: true,
    showDescripcionCliente: true,
    showEstado: true,
    showHoraInicio: true,
    showActividad: false,
    showValidar: false,
    showAddImagen: true,
    showSaveImagen: true,
  };

  visibleCamposCliente: any = {
    showFechIni: false,
    showFechFin: false,
    showNumCarpeta: false,
    showCaso: true,
    showPrecio: false,
    showCliente: false,
    showAbogado: false,
    showDescripcionAdmin: false,
    showDescripcionAbogado: false,
    showDescripcionCliente: true,
    showEstado: false,
    showHoraInicio: false,
    showActividad: false,
    showValidar: false,
    showAddImagen: false,
    showSaveImagen: false,
  }

  // Botones que van a estar visibles.
  visibleBotonesAdministrador: any = {
    showMail: true,
    showGuardar: true,
    showAnadir: true,
    showAnadirCaso: true,
    showQuitar: true,
    showAnadirFoto: true,
    showGuardarCaso: true,
    showExpandirArbol: true,
    showContraerArbol: true,
    showCancelar: true,
    showObservacionCliente: false,
  };

  visibleBotonesAbogado: any = {
    showMail: true,
    showGuardar: true,
    showAnadir: true,
    showAnadirCaso: false,
    showQuitar: true,
    showAnadirFoto: true,
    showGuardarCaso: true,
    showExpandirArbol: true,
    showContraerArbol: true,
    showCancelar: true,
    showObservacionCliente: false,
  };

  visibleBotonesCliente: any = {
    showMail: false,
    showGuardar: false,
    showAnadir: false,
    showAnadirCaso: false,
    showQuitar: false,
    showAnadirFoto: true,
    showGuardarCaso: false,
    showExpandirArbol: false,
    showContraerArbol: false,
    showCancelar: true,
    showObservacionCliente: true,
  };

  // Botones habilitar/desbilitar botones de casos.
  blockBotones: any = {
    addCaso: false,
    guardarCaso: false,
    expandir: true,
    contraer: false,
    observacionCliente: false,
    cancelar: false,
    guardarNodo: false,
    enviarMail: false,
    addNodo: false,
    deleteNodo: false,
    addImagen: false,
    mail: false,
  };

  // desabilitar botones de caso
  disabledBotonesCaso: any = {
    addCaso: true,
    guardarCaso: true,
    expandir: true,
    contraer: true,
    observacionCliente: true,
    cancelar: true,
    guardarNodo: false,
    enviarMail: false,
    addNodo: false,
    deleteNodo: false,
    addImagen: false,
    mail: false,
  };

  // desabilitar botones de nodo
  disabledBotonesNodo: any = {
    addCaso: false,
    guardarCaso: false,
    expandir: true,
    contraer: false,
    observacionCliente: false,
    cancelar: true,
    guardarNodo: true,
    enviarMail: true,
    addNodo: true,
    deleteNodo: true,
    addImagen: true,
    mail: true,
  };

  // Habilitar botones usuario, cliente, abogado.
  blockBotonesGene: any = {
    guardar: false,
    cancelar: false,
    eliminar: false,
    restaurar: false
  }

  // Habilitar boton genenrerar reporte.
  blockBotonesReport: any = {
    reporte: false,
  }

  // desabilitar botones genenrerar reporte.
  disabledBotonesReport: any = {
    reporte: true,
  }


  // Habilitar botones usuario, cliente, abogado.
  disabledBotonesGene: any = {
    guardar: true,
    cancelar: true,
    eliminar: true,
    restaurar: true
  }

  // Etiquetas de botones.
  etiquetasBotonesAdministrador: any = {
    mail: 'Email',
    guardar: 'Guardar',
    anadir: 'Añadir',
    anadirCaso: 'Añadir Caso',
    quitar: 'Quitar',
    imagenes: 'Imágenes',
    guardarCaso: 'Guardar',
    expandir: 'Expandir',
    contraer: 'Contraer',
    cancelar: 'Cancelar',
    obserCliente: 'Enviar Observación',
  };

  etiquetasBotonesAbogado: any = {
    mail: 'Email',
    guardar: 'Guardar',
    anadir: 'Añadir',
    anadirCaso: 'Añadir Caso',
    quitar: 'Quitar',
    imagenes: 'Imágenes',
    guardarCaso: 'Guardar',
    expandir: 'Expandir',
    contraer: 'Contraer',
    cancelar: 'Cancelar',
    obserCliente: 'Enviar Observación',
  };

  etiquetasBotonesCliente: any = {
    mail: 'Email',
    guardar: 'Guardar',
    anadir: 'Añadir',
    anadirCaso: 'Añadir Caso',
    quitar: 'Quitar',
    imagenes: 'Imágenes',
    guardarCaso: 'Guardar',
    expandir: 'Expandir',
    contraer: 'Contraer',
    cancelar: 'Salir',
    obserCliente: 'Enviar Observación',
  };

  // Visibles opciones menu
  showMenuAdministrador = {
    showDashboard: true,
    showCalendario: true,
    showUsuario: true,
    showCliente: true,
    showAbogado: true,
    showFlujo: true,
    showCasos: true,
    showReporte: true,
    showNotificacion: true,
    showGraficos: true,
  };
  showMenuAbogado = {
    showDashboard: true,
    showCalendario: true,
    showUsuario: false,
    showCliente: false,
    showAbogado: false,
    showFlujo: false,
    showCasos: true,
    showReporte: false,
    showNotificacion: true,
    showGraficos: false,
  };
  showMenuCliente = {
    showDashboard: false,
    showCalendario: false,
    showUsuario: false,
    showCliente: false,
    showAbogado: false,
    showFlujo: false,
    showCasos: true,
    showReporte: false,
    showNotificacion: true,
    showGraficos: false,
  };

  // Actividades Extras 
  showBotonesActividades: any = {
    bttnUpdate: true,
    bttnDelete: true,
    bttnRestaurar: false
  };

  showBotonEliminarActividad: any = {
    bttnUpdate: false,
    bttnDelete: false,
    bttnRestaurar: true
  };

  showBotonRestaurarActividad: any = {
    bttnUpdate: false,
    bttnDelete: false,
    bttnRestaurar: false
  };
}
