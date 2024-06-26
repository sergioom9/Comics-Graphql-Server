// Se define TODO lo que ofrece la  API

export const typeDefs = `#graphql

  type Usuario {
    id: ID!
    nombre: String!
    correo_e: String!
    coleccion: [Coleccion!]!
  }

  type Comic {
    id: ID!
    titulo: String!
    descripcion: String!
    formato: String!
  }

  type Coleccion {
    id: ID!
    nombre: String!
    comics: [Comic!]!
  }


  type Query {

    usuario(id: ID!): Usuario! 

    usuarios: [Usuario!]! 

    comic(id: ID!): Comic! 

    comics: [Comic!]! 
  }
  

  type Mutation {
    
    addUsuario(nombre: String!, correo_e: String!, coleccion: [String!]!): Usuario! 

    updateUsuario(id: ID!, nombre: String!, correo_e: String!,coleccion: [String!]!): Usuario! 

    deleteUsuario(id: ID!): Usuario! 

    addColeccion(nombre: String!, comics: [String!]!): Coleccion! 

    updateColeccion(id: ID!, nombre: String!, comics: [String!]!): Coleccion! 

    deleteColeccion(id: ID!): Coleccion!

    addComic(titulo: String!, descripcion: String!, formato: String!): Comic! 

    updateComic(id: ID!, titulo: String!, descripcion: String!, formato: String!): Comic! 

    deleteComic(id: ID!): Comic! 
  }
`;
