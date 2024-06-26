import mongoose from "mongoose";
import { Comic } from "../types.ts";
import { ColeccionModel } from "./coleccion.ts";

const Schema = mongoose.Schema; 

const ComicSchema = new Schema( 
  {
    // El id se genera automáticamente
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    formato: { type: String, required: true },
  },
  { timestamps: true }
);

export type ComicModelType = mongoose.Document & Omit<Comic,"id">; 


ComicSchema.post('findOneAndDelete', async function (doc: ComicModelType) {
  try {
    await ColeccionModel.updateMany( // Actualizo todas las colecciones
      { id_comics: doc._id },           // Que tengan el cómic que se ha borrado
      { $pull: { id_comics: doc._id } } // Y que se borre de la colección
    );
  } catch (e) {
    console.log(e);
  }
});


export const ComicModel = mongoose.model<ComicModelType>( "Comic",  ComicSchema );