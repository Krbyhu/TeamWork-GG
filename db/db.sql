CREATE DATABASE liga_riot;

use liga_riot;

CREATE TABLE Juego
(
	nombre_juego VARCHAR (50)NOT NULL PRIMARY KEY
);

CREATE TABLE Tipo_de_torneo
(
    id_tipo INT NOT NULL PRIMARY KEY,
    nombre_juego VARCHAR (50) NOT NULL,
    modalidad VARCHAR (50),
    FOREIGN KEY (nombre_juego) REFERENCES Juego (nombre_juego)
    on update cascade
    on delete cascade
);

CREATE TABLE Tarjeta_jugador
(
	id_tarjeta INT NOT NULL PRIMARY KEY,
	id_in_game VARCHAR (50),
	estadisticas INT ,
	fortaliza VARCHAR (50),
	debilidad VARCHAR (50)
);

CREATE TABLE Usuario
(
	correo VARCHAR (50) NOT NULL PRIMARY KEY,
	id_tarjeta  INT,
	nombre_usuario VARCHAR (50),
	contrasena VARCHAR (100),
	id_in_game VARCHAR (50),
	region VARCHAR (50),
    creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_tarjeta) REFERENCES Tarjeta_jugador (id_tarjeta)
    on update cascade
    on delete cascade
);

CREATE TABLE PERFIL(
	id_perfil INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	correo_usuario VARCHAR (50),
	descripcion VARCHAR (100),
    img VARCHAR(200) DEFAULT 'https://www.w3schools.com/howto/img_avatar.png',
	FOREIGN KEY (correo_usuario) REFERENCES Usuario (correo)
    on update cascade
    on delete cascade
);

CREATE TABLE Foro(
	id_foro INT PRIMARY KEY,
	correo VARCHAR(50),
	titulo VARCHAR(50),
	cuerpo VARCHAR(100),
	FOREIGN KEY (correo) REFERENCES Usuario (correo)
    on update cascade
    on delete cascade
);

CREATE TABLE comentario(
	id_comentario INT PRIMARY KEY,
	id_foro INT,
	contenito VARCHAR(100),
	nombre_usuario VARCHAR(50),
	FOREIGN KEY (id_foro) REFERENCES Foro (id_foro)
    on update cascade
    on delete cascade
	
);

CREATE TABLE Respuesta(
	id_respuesta INT PRIMARY KEY,
	id_comentario INT,
	contenito VARCHAR(100),
	nombre_usuario VARCHAR(50),
	FOREIGN KEY (id_comentario) REFERENCES comentario (id_comentario)
    on update cascade
    on delete cascade
);

CREATE TABLE Torneo(
	id_torneo INT PRIMARY KEY,
	id_tipo INT,
	correo VARCHAR(50),
	nombre_torneo VARCHAR(50),
	cupos INT,
	fecha_inicio DATETIME,
	hora_terminno DATETIME,
	FOREIGN KEY (id_tipo) REFERENCES Tipo_de_torneo (id_tipo),
	FOREIGN KEY (correo) REFERENCES Usuario (correo)
    on update cascade
    on delete cascade
);

CREATE TABLE tabla(
	id_tabla INT PRIMARY KEY,
	id_torneo INT,
	puntos INT,
	partidas_ganadas INT,
	partidas_jugadas INT,
	nombre_equipo VARCHAR(50),
	partidas_perdidas INT,
	FOREIGN KEY (id_torneo) REFERENCES Torneo (id_torneo)
    on update cascade
    on delete cascade
	
);

CREATE TABLE Historial (
	id_partida INT PRIMARY KEY,
	id_torneo INT,
	hora_inicio DATETIME,
	hora_fin DATETIME,
	perdedor VARCHAR(50),
	ganador VARCHAR(50),
	FOREIGN KEY (id_torneo) REFERENCES Torneo (id_torneo)
    on update cascade
    on delete cascade

);

CREATE TABLE equipo(
	id_equipo INT PRIMARY KEY,
	id_torneo INT,
	nomnbre_equipo VARCHAR(50),
	FOREIGN KEY (id_torneo) REFERENCES Torneo (id_torneo)
    on update cascade
    on delete cascade
);

CREATE TABLE calendario(
	id_calentario INT PRIMARY KEY,
	id_equipo INT,
	hora_terminio_partida DATETIME,
	hora_partida DATETIME,
	FOREIGN KEY (id_equipo) REFERENCES equipo (id_equipo)
    on update cascade
    on delete cascade
);

CREATE TABLE roster(
	id_roster INT PRIMARY KEY,
	id_equipo INT,
	posicion VARCHAR(50),
	id_in_game VARCHAR(50),
	FOREIGN KEY (id_equipo) REFERENCES equipo (id_equipo)
    on update cascade
    on delete cascade
);