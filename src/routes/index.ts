import express from "express";
import monitores from "./monitores.routes.ts"

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Curso de node"})
  })

  app.use(
    express.json(),
    monitores,
    //livros,
    //autores
  )
}

export default routes