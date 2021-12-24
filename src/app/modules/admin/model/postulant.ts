import {User} from "../../../core/user/user.model";

export class Postulant {
    id?: number;
    prenom: string;
    nom: string;
    telephone: string;
    user: User;
}
