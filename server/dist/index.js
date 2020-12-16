"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const forum_routes_1 = __importDefault(require("./routes/forum.routes"));
//Inicialization
const app = express_1.default();
dotenv_1.default.config();
//Settings
app.set('port', process.env.PORT || 3000);
// //Mddlewares
app.use(morgan_1.default('dev'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cors_1.default({
    exposedHeaders: ['auth-token'],
}));
//Routes
app.use('/api/auth', user_routes_1.default);
app.use('/api/forum', forum_routes_1.default);
//Starting the server
app.listen(app.get('port'), () => {
    console.log('\nServer is running at http://localhost:' +
        app.get('port') + '\n');
});
