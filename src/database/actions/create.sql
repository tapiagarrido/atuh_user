CREATE TABLE public.usuarios (
    id serial NOT NULL PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    usuario varchar(50) NOT NULL,
    contraseña varchar(16) not null,
    correo varchar(100) NOT NULL,
    telefono varchar(50) NOT NULL,
    direccion varchar(100) NOT NULL,
    edad integer NOT NULL,
    rut varchar(30) NOT NULL,
    confirmado boolean,
    fecha_creacion timestamp,
    fecha_modificacion timestamp,
    fecha_eliminacion timestamp
);