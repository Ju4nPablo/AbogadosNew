import { Injectable } from '@angular/core';

@Injectable()
export class ListaCombosService {

  //#region  Creaciond e variables e incializacion.
  listEstado: any = [];
  //#endregion

  constructor() { }

  listacomboEstadoActividad: any = [
    {
      id: '1',
      estado: 'Activo'
    },
    {
      id: '2',
      estado: 'Eliminado'
    }];

  listacomboEstadoCaso: any = [
    {
      id: '1',
      estado: 'Pendiente'
    },
    {
      id: '2',
      estado: 'Activo'
    },
    {
      id: '3',
      estado: 'Pasivo'
    },
    {
      id: '4',
      estado: 'Urgente'
    },
    {
      id: '5',
      estado: 'Abandono'
    },
    {
      id: '6',
      estado: 'Terminado'
    }];

  listacomboHoras: any = [{ hora: '08:00' }, { hora: '08:30' }, { hora: '09:00' }, { hora: '09:30' }, { hora: '10:00' }, { hora: '10:30' },
  { hora: '11:00' }, { hora: '11:30' }, { hora: '12:00' }, { hora: '12:30' }, { hora: '13:00' }, { hora: '13:30' }, { hora: '14:00' },
  { hora: '14:30' }, { hora: '15:00' }, { hora: '15:30' }, { hora: '16:00' }, { hora: '16:30' },
  { hora: '17:00' }, { hora: '17:30' }, { hora: '18:00' }];

  listaPrioridadActividad: any = [
    {
      color: 'red',
      prioridad: 'Alta'
    },
    {
      color: 'yellow',
      prioridad: 'Media'
    },
    {
      color: 'green',
      prioridad: 'Baja'
    }];

}
