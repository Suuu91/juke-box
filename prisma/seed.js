const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const getRandomInt = (lower, upper) =>
  lower + Math.floor(Math.random() * (upper - lower + 1));

const seed = async (numUsers = 5, numPlaylists = 10, numTracks = 20) => {

  const users = Array.from({ length: numUsers }, () => ({
    username: faker.internet.displayName(),
  }));
  await prisma.user.createMany({ data: users });

  const tracks = Array.from({ length: numTracks }, () => ({
    name: faker.music.songName(),
  }));
  await prisma.track.createMany({ data: tracks });

  for (let i = 0; i < numPlaylists; i++) {
    const numTracksInPlaylist = getRandomInt(5, 10);
    const playlistTracks = Array.from({ length: numTracksInPlaylist }, () => ({
      id: getRandomInt(1, numTracks),
    }));
    await prisma.playlist.create({
      data: {
        name: faker.music.album(),
        description: faker.lorem.sentences(2),
        ownerId: getRandomInt(1, numUsers),
        tracks: { connect: playlistTracks },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });