"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const helpers_1 = require("../lib/helpers");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { correo, contrasena, nombre_usuario } = req.body;
    const newUser = {
        correo,
        contrasena,
        nombre_usuario
    };
    newUser.contrasena = yield helpers_1.encryptPassword(newUser.contrasena);
    yield database_1.default.query('INSERT INTO usuario SET ?', [newUser]);
    yield database_1.default.query('INSERT INTO perfil SET correo_usuario = ?', [newUser.correo]);
    const user = yield database_1.default.query('select id_perfil, correo, contrasena, nombre_usuario, img from usuario as u join perfil as p on u.correo = p.correo_usuario WHERE correo = ?', [newUser.correo]);
    const token = jsonwebtoken_1.default.sign({ correo: newUser.correo }, 'TOKENSECRET', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(user[0]);
});
exports.signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield database_1.default.query('SELECT * FROM usuario WHERE correo = ?', [req.body.correo]);
    const user = rows[0];
    console.log(req.body);
    if (rows.length > 0) {
        const user = rows[0];
        const validPass = yield helpers_1.matchPassword(req.body.contrasena, user.contrasena);
        if (!validPass) {
            return res.status(400).json('La contraseña es incorrecta');
        }
    }
    else {
        return res.status(400).json('El correo es incorrecto o no existe');
    }
    const usersend = yield database_1.default.query('select id_perfil, correo, contrasena, nombre_usuario, img from usuario as u join perfil as p on u.correo = p.correo_usuario WHERE correo = ?', [user.correo]);
    const token = jsonwebtoken_1.default.sign({ correo: user.correo }, 'TOKENSECRET', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(usersend[0]);
});
exports.profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield database_1.default.query('select id_perfil, correo, contrasena, nombre_usuario, img, descripcion from usuario as u join perfil as p on u.correo = p.correo_usuario WHERE id_perfil = ?', [id]);
    if (user.length > 0) {
        return res.json(user[0]);
    }
    res.status(404).json({ message: 'Usuario no existe' });
});
exports.profileUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const mail = yield database_1.default.query('SELECT correo_usuario FROM perfil WHERE id_perfil = ?', [id]);
    yield database_1.default.query('UPDATE usuario SET ? WHERE correo = ?', [req.body[0], mail[0].correo_usuario]);
    yield database_1.default.query('UPDATE perfil SET ? WHERE id_perfil = ?', [req.body[1], id]);
    res.json({ message: 'Usuario modificado' });
});
