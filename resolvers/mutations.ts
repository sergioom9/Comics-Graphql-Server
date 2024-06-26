import { mongoose } from "mongoose";

import { Usuario,Comic,Coleccion } from "../types.ts"; // Importo el tipo de typescript

import { GraphQLError } from "graphql"; // Importo el tipo de error de graphql

import { UsuarioModel,UsuarioModelType } from "../DB/usuario.ts";
import { ComicModel, ComicModelType } from "../DB/comic.ts";
import { ColeccionModel, ColeccionModelType } from "../DB/coleccion.ts";

export const Mutation = {

    // Mutaciones de Usuario
    
    addUsuario: async (_:unknown, args: {nombre: string, correo_e:string, coleccion:String[]}): Promise<UsuarioModelType>  => {

        const { nombre, correo_e, coleccion } = args;

        try{
            const id_coleccion = coleccion.map(coleccionID => new mongoose.Types.ObjectId(coleccionID)); // Convierto los IDs de coleccion a tipo ObjectId

            const usuario = new UsuarioModel({
                nombre,
                correo_e,
                id_coleccion,
            });
    
            await usuario.save();
    
            return usuario;
        }catch(e){
            throw new GraphQLError(e);
        }
        
    },
    
    updateUsuario: async (_:unknown, args: {id:string, nombre: string, correo_e:string, coleccion:String[]}): Promise<UsuarioModelType>  => {

        const { id, nombre, correo_e, coleccion } = args;
        
        const id_coleccion = coleccion.map(coleccionID => new mongoose.Types.ObjectId(coleccionID)); // Convierto los IDs de coleccion a tipo ObjectId

        const usuario = await UsuarioModel.findByIdAndUpdate(
        id,
        { nombre, correo_e, id_coleccion },
        { new: true, runValidators: true } // Se ejecutan las validaciones del esquema de la base de datos al actualizar
        );


        if (!usuario) {
            throw new GraphQLError("No existe el usuario");
        }

        return usuario;
    },

    deleteUsuario: async (_:unknown, args: {id:string}): Promise<UsuarioModelType>  => {

        const { id } = args;

        const usuario = await UsuarioModel.findByIdAndDelete(id);

        
        if (!usuario) {
            throw new GraphQLError("No existe el usuario");
        }

        return usuario;
    },
    
    // Mutaciones de Coleccion

    addColeccion: async (_:unknown, args: {nombre: string, comics:String[]}): Promise<ColeccionModelType>  => {

        const { nombre, comics } = args;
        
        try{
            const id_comics = comics.map(comicId => new mongoose.Types.ObjectId(comicId)); // Convierto los IDs de cómics a tipo ObjectId
  
            const coleccion = new ColeccionModel({
                nombre,
                id_comics,
            });

        await coleccion.save();

        

        return coleccion;

        }catch(e){
            throw new GraphQLError(e);
        }
    },

    updateColeccion: async (_:unknown, args: {id:string, nombre: string, comics:String[] }): Promise<ColeccionModelType>  => {

        const { id, nombre, comics } = args;

        const id_comics = comics.map(comicId => new mongoose.Types.ObjectId(comicId)); // Convierto los IDs de cómics a tipo ObjectId


        const coleccion = await ColeccionModel.findByIdAndUpdate(
        id,
        { nombre, id_comics },
        { new: true, runValidators: true }  // Se ejecutan las validaciones del esquema de la base de datos al actualizar
        );
    
        if (!coleccion) {
            throw new GraphQLError("No existe la coleccion");
        }

        return coleccion;
    },

    deleteColeccion: async (_:unknown, args: {id:string}): Promise<ColeccionModelType>  => {

        const { id } = args;

        const coleccion = await ColeccionModel.findOneAndDelete({ _id: id });

        if (!coleccion) {
            throw new GraphQLError("No existe la coleccion");
        }

        return coleccion;
    },

    // Mutaciones de Comic
    
    addComic: async (_:unknown, args: {titulo: string, descripcion:string, formato:string}): Promise<ComicModelType>  => {

        const { titulo, descripcion, formato } = args;

        const comic = new ComicModel({
        titulo,
        descripcion,
        formato,
        });

        await comic.save();

        return comic;
    },

    updateComic: async (_:unknown, args: {id:string, titulo: string, descripcion:string, formato:string}): Promise<ComicModelType>  => {

        const { id, titulo, descripcion, formato } = args;

        const comic = await ComicModel.findByIdAndUpdate(
        id,
        { titulo, descripcion, formato },
        { new: true }
        );
        
        if (!comic) {
            throw new GraphQLError("No existe el comic");
        }

        return comic;
    },

    deleteComic: async (_:unknown, args: {id:string}): Promise<ComicModelType>  => {

        const { id } = args;

        const comic = await ComicModel.findOneAndDelete({ _id: id });   // Busco el comic por su ID y lo elimino -> Como uso post para borrarlo de las colecciones, no hace falta que lo borre de las colecciones aquí

        if (!comic) {
            throw new GraphQLError("No existe el comic");
        }

        return comic;
    }

};
