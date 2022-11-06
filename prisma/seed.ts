import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/deglier.png'
    }
  })

  const poll = await prisma.poll.create({
    data: {
      title: 'Example poll',
      code: 'BOL123',
      ownerId: user.id,
      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:00.273Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })
  await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:00.273Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
      guesses: {
        create: {
          firstTeamPoint: 2,
          secondTeamPoint: 2,
          participant: {
            connect: {
              userId_pollId: {
                pollId: poll.id,
                userId: user.id
              }
            }
          }
        }
      }
    }
  })
}

main()