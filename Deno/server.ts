import { Application, Context, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.response.body = "Hola mundo!!!🌎🌍";
});

const reverse = (frase:string) => {
  return frase.split(" ").reverse().join(" ")
}

router.get("/frase", (ctx: Context) => {
  const queryParams = ctx.request.url.searchParams;
  const frase = queryParams.get('frase');
  const nuevaFrase = reverse(frase)
  ctx.response.status = 200;
  ctx.response.body = `
    <!DOCTYPE html>
    <html>
      <head><title>Frase al reves</title><head>
      <body>
        <h1 style="color: blue; text-align: center;">${nuevaFrase}</h1>
      </body>
    </html>
    `;
});

app.use(router.routes());

app.listen({ port: 3000 });

console.log("Server listening port 3000");
