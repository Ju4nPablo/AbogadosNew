import { Injectable } from '@angular/core';

@Injectable()
export class EtiquetasService {

  constructor() { }

  etiquetasCasoAdministrador: any = {
    tituloTabla: 'CASOS',
    nota: ' Seleccione un registro para modificar.',
    tituloFormCaso: 'MODIFICAR CASO',
    tituloFormDiligecia: 'MODIFICAR DILIGENCIA',
    tituloFormImagen: 'AÑADIR IMÁGENES'
  };

  etiquetasCasoAbogado: any = {
    tituloTabla: 'CASOS',
    nota: ' Seleccione un registro para modificar.',
    tituloFormCaso: 'MODIFICAR CASO',
    tituloFormDiligencia: 'MODIFICAR DILIGENCIA',
    tituloFormImagen: 'AÑADIR IMÁGENES'
  };

  etiquetasCasoCliente: any = {
    tituloTabla: 'CASOS',
    nota: ' Seleccione un registro para ver su información.',
    tituloFormCaso: 'CASO',
    tituloFormDiligencia: 'CITACIÓN',
    tituloFormImagen: 'IMÁGENES'

  };

}
