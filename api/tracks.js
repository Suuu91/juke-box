const express = require("express")
const router = express.Router()
module.exports = router

const prisma = require("../prisma")

router.get("/", async (req, res, next) => {
  try {
    const allTracks = await prisma.track.findMany()
    res.json(allTracks)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  const {id} = req.params
  try {
    const desiredTrack = await prisma.track.findUniqueOrThrow({
      where: {id: +id}
    })
    res.json(desiredTrack)
  } catch (error) {
    next(error)
  }
})