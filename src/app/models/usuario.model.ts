

export class Usuario{
    constructor(
        public nombre: string, 
        public email: string,
        public role: string,
        public password?: string, 
        public img?: string, 
        public uid?: string, 
    ){}
}