import { Request, Response } from 'express';
import db from '../database';

import { encryptPassword, matchPassword } from '../lib/helpers';

import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    const { correo, contrasena, nombre_usuario } = req.body;
    const newUser = {
        correo,
        contrasena,
        nombre_usuario
    }
    newUser.contrasena = await encryptPassword(newUser.contrasena);
    await db.query('INSERT INTO usuario SET ?', [newUser]);
    await db.query('INSERT INTO perfil SET correo_usuario = ?', [newUser.correo]);
    const user = await db.query('select id_perfil, correo, contrasena, nombre_usuario, img from usuario as u join perfil as p on u.correo = p.correo_usuario WHERE correo = ?', [newUser.correo])
    const token = jwt.sign({ correo: newUser.correo }, 'TOKENSECRET', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(user[0]);
};

export const signin = async (req: Request, res: Response) => {
    const rows = await db.query('SELECT * FROM usuario WHERE correo = ?', [req.body.correo]);
    const user = rows[0];
    console.log(req.body)
    if (rows.length > 0) {
        const user = rows[0];
        const validPass = await matchPassword(req.body.contrasena, user.contrasena);
        if (!validPass) {
            return res.status(400).json('La contraseña es incorrecta');
        }
    } else {
        return res.status(400).json('El correo es incorrecto o no existe');
    }
    const usersend = await db.query('select id_perfil, correo, contrasena, nombre_usuario, img from usuario as u join perfil as p on u.correo = p.correo_usuario WHERE correo = ?', [user.correo])
    const token = jwt.sign({ correo: user.correo }, 'TOKENSECRET', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(usersend[0]);
};

export const profile = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await db.query('select id_perfil, correo, contrasena, nombre_usuario, img, descripcion from usuario as u join perfil as p on u.correo = p.correo_usuario WHERE id_perfil = ?', [id]);
    if (user.length > 0){
        return res.json(user[0]);
    }
    res.status(404).json({message: 'Usuario no existe'});
};

export const profileUpdate = async (req:Request, res: Response) => {
    const { id } = req.params;
    const mail = await db.query('SELECT correo_usuario FROM perfil WHERE id_perfil = ?', [id]);
    await db.query('UPDATE usuario SET ? WHERE correo = ?', [req.body[0], mail[0].correo_usuario]);
    await db.query('UPDATE perfil SET ? WHERE id_perfil = ?', [req.body[1], id])
    res.json({message: 'Usuario modificado'});
};