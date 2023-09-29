import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const passwordPriyansh = await bcrypt.hash('123456', roundsOfHashing);
  const passwordDoctor1 = await bcrypt.hash('doctor', roundsOfHashing);
  const passwordDoctor2 = await bcrypt.hash('doctor2', roundsOfHashing);
  const passwordDoctor3 = await bcrypt.hash('doctor3', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'priyanshbalyan@gmail.com' },
    update: {
      password: passwordPriyansh,
    },
    create: {
      email: 'priyanshbalyan@gmail.com',
      password: passwordPriyansh,
    },
  });

  // Create 3 doctor type users
  const user2 = await prisma.user.upsert({
    where: { email: 'hlimasheppard@gmail.com' },
    update: {
      password: passwordDoctor1,
    },
    create: {
      name: 'Dr. Halima Sheppard',
      email: 'hlimasheppard@gmail.com',
      specialisation: 'Cardiologist',
      password: passwordDoctor1,
      type: 'Doctor',
    },
  });

  const user3 = await prisma.user.upsert({
    where: { email: 'kennethwalters@gmail.com' },
    update: {
      password: passwordDoctor2,
    },
    create: {
      name: 'Dr. Kenneth Walters',
      email: 'kennethwalters@gmail.com',
      specialisation: 'Orthodontist',
      password: passwordDoctor2,
      type: 'Doctor',
    },
  });

  const user4 = await prisma.user.upsert({
    where: { email: 'jenniferstone@gmail.com' },
    update: {
      password: passwordDoctor3,
    },
    create: {
      name: 'Dr. Jennifer Stone',
      email: 'jenniferstone@gmail.com',
      specialisation: 'Eye Specialist',
      password: passwordDoctor3,
      type: 'Doctor',
    },
  });

  // create dummy slots
  const slot1 = await prisma.slot.upsert({
    where: { id: 1 },
    update: {
      authorId: user1.id,
    },
    create: {
      time: new Date(),
      authorId: user1.id,
      doctorId: user2.id,
    },
  });

  console.log({ user1, user2, user3, user4, slot1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });
