const express = require("express")
const router = express.Router()
module.exports = router

const prisma = require ("../prisma")

router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  const {id} = req.params
  try {
    const desiredUser = await prisma.user.findUniqueOrThrow({
      where : {id: +id},
      include :{ playlits: true}
    })
    res.json(desiredUser)
  } catch (error) {
    next(error)
  }
})


