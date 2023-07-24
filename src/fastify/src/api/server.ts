import { app } from "./fastify";

app.listen({ port: 3002 }, (err, address) => {
  console.log(`Server listening at ${address}`);
});
