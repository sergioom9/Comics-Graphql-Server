import { Usuario,Comic,Coleccion } from "../types.ts";

import { GraphQLError } from "graphql"; // Importo el tipo de error de graphql

import { UsuarioModel, UsuarioModelType } from "../DB/usuario.ts";

import { ComicModel, ComicModelType } from "../DB/comic.ts";

export const Query = {

    // Consultas de Usuario
    
    usuario: async (_:unknown, args: {id:string}): Promise<UsuarioModelType>  => {

        const { id } = args;
        try{
            const usuario_db = await UsuarioModel.findById(id);

            if (!usuario_db) {
                throw new GraphQLError("No existe el usuario");
            }

            const Usuario = {
                id: usuario_db._id,
                nombre: usuario_db.nombre,
                correo_e: usuario_db.correo_e,
                coleccion: usuario_db.id_coleccion,
            }

            //console.log(Usuario);

            return Usuario;

        }catch(e){
            throw new GraphQLError(e);
        }
    },
    
    usuarios: async (): Promise<UsuarioModelType[]>  => {

        try{
            const usuarios_db = await UsuarioModel.find();

            const usuarios = usuarios_db.map((usuario_db:UsuarioModelType) => {
                const Usuario = {
                    id: usuario_db._id,
                    nombre: usuario_db.nombre,
                    correo_e: usuario_db.correo_e,
                    coleccion: usuario_db.id_coleccion,
                }
                return Usuario;
            });

            return usuarios;
        }
        catch(e){
            throw new GraphQLError(e);
        }
    },
    
    // Consultas de Comic
    
    comic: async (_:unknown, args: {id:string}): Promise<ComicModelType>  => {

        const { id } = args;

        const comic = await ComicModel.findById(id);

        if (!comic) {
            throw new GraphQLError("No existe el comic");
        }

        return comic;
    },
    
    comics: async (): Promise<ComicModelType[]>  => {

        const comics = await ComicModel.find();

        return comics;
    },

}