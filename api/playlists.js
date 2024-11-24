const express = require("express")
const router = express.Router()
module.exports = router

const prisma = require("../prisma")

router.get("/", async(req, res, next) => {
  try {
    const allPlaylists = await prisma.playlist.findMany()
    res.json(allPlaylists)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async(req, res, next) => {
  const {id} = req.params
  try {
    const desiredPlaylist = await prisma.playlist.findUniqueOrThrow({
      where: {id: +id},
      include: { tracks: true}
    })
    res.json(desiredPlaylist)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  const {name, description, ownerId, trackIds} = req.body
  const tracks = trackIds.map((id) => ({id: +id}))
  try {
    const playlistToAdd = await prisma.playlist.create({
      data:{
        name,
        description,
        ownerId: +ownerId,
        trakcs: {connect: tracks},
      },
      include: {
        owner: true,
        tracks: true,
      }
    })
    res.json(playlistToAdd)
  } catch (error) {
    next(error)
  }
})