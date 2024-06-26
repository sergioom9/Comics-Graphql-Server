import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs } from "./GraphQL/typeDefs.ts";
import { Mutation } from "./resolvers/mutations.ts";
import { Query } from "./resolvers/query.ts";
import { Coleccion, Usuario } from "./resolvers/encadenados.ts";

try {
  const MONGO_URL =
    "mongodb+srv://sergioom9:nebrija22@cluster0.9dzkoo1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

  if (!MONGO_URL) {
    console.log("No mongo URL found");
    throw "error";
  }
  await mongoose.connect(MONGO_URL);

  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      Usuario,
      Coleccion,
    },
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });
  console.log(`🛸 Server ready at ${url}`);
} catch (error) {
  console.error(error);
  Deno.exit(1);
}
