import { UsuarioModel, UsuarioModelType } from "../DB/usuario.ts";

import { ColeccionModel, ColeccionModelType } from "../DB/coleccion.ts";
import { ComicModel, ComicModelType } from "../DB/comic.ts";

import { GraphQLError } from "graphql"; 

export const Usuario = {
    coleccion: async (
        parent: UsuarioModelType,
    ): Promise<ColeccionModelType[]> => {
        const coleccion = await ColeccionModel.find({
            _id: { $in: parent.coleccion },
        });
        if (!coleccion) {
            throw new GraphQLError("No existe la coleccion");
        }
        return coleccion;
    },
};

export const Coleccion = {
    comics: async (parent: ColeccionModelType): Promise<ComicModelType[]> => {
        const comics = await ComicModel.find({
            _id: { $in: parent.id_comics },
        });
        if (!comics) {
            throw new GraphQLError("No existen comics");
        }
        return comics;
    },
};
