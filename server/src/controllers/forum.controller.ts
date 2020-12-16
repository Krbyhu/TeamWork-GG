import { Request, Response } from 'express';
import db from '../database';

export const forumList = async (req: Request, res: Response) => {
    const forum = await db.query('select id_foro, f.correo, titulo, cuerpo, nombre_usuario, img from foro as f join usuario as u on f.correo = u.correo join perfil as p on u.correo = p.correo_usuario order by id_foro desc');
    res.json(forum);
};

export const getID = async (req: Request, res: Response) => {
    const id = await db.query('SELECT MAX(id_foro) AS id from foro;');
    res.json(id);
};

export const newPost = async (req: Request, res: Response) => {
    const mail = await db.query('SELECT correo FROM usuario WHERE nombre_usuario = ?', [req.body[1].nombre_usuario]);
    await db.query('INSERT INTO foro (id_foro, correo, titulo, cuerpo) VALUES (?, ? ,? ,?)', [req.body[0].id_foro, mail[0].correo, req.body[0].titulo, req.body[0].cuerpo]);
    res.json({message: 'newPost'});
};

