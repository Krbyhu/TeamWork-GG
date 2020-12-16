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
exports.forumList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const forum = yield database_1.default.query('select id_foro, f.correo, titulo, cuerpo, nombre_usuario, img from foro as f join usuario as u on f.correo = u.correo join perfil as p on u.correo = p.correo_usuario order by id_foro desc');
    res.json(forum);
});
exports.getID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield database_1.default.query('SELECT MAX(id_foro) AS id from foro;');
    res.json(id);
});
exports.newPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const mail = yield database_1.default.query('SELECT correo FROM usuario WHERE nombre_usuario = ?', [req.body[1].nombre_usuario]);
    yield database_1.default.query('INSERT INTO foro (id_foro, correo, titulo, cuerpo) VALUES (?, ? ,? ,?)', [req.body[0].id_foro, mail[0].correo, req.body[0].titulo, req.body[0].cuerpo]);
    res.json({ message: 'newPost' });
});
