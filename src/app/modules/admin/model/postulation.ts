import {Concours} from "./concours";
import {Postulant} from "./postulant";

export class Postulation {
    id?: number;
    concours: Concours;
    postulant: Postulant;
    paiement: any;
}
