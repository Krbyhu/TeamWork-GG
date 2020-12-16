export interface IUser {
    correo?: string;
    id_tarjeta?: number;
    nombre_usuario?: string;
    contrasena?: string;
    id_in_game?: number;
}

export interface IProfile {
    id_perfil?: number;
    descripcion?: string;
    img?: string;
}

export interface IForum {
    id_foro?: number;
    correo?: string;
    titulo?: string;
    cuerpo?: string;
}