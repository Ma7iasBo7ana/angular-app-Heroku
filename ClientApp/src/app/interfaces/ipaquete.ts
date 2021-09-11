//import {Camionero} from './Model/Camionero'; 
//import {Provincia} from './Model/Provincia';

import { Icamionero } from "./icamionero";
import { Iprovincia } from "./iprovincia";

export interface Ipaquete {

id:number,
descripcion:string,
destinatario:string,
direccionDestinatario:string,
entregado:boolean,
camionero:Icamionero,
provincia:Iprovincia


}
