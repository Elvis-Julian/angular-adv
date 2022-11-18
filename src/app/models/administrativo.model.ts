interface _administrativoUser{
    _id: string;
    nombre: string;
}

export class Administrativo {

    constructor (
        public _id: string,
        public idUsuario: string,
        public nombre: string,
        public fecha: string,
        public hora_ent: string,
        public hora_sld: string,
        public img: string,
        public usuario: _administrativoUser,
    ){}
}