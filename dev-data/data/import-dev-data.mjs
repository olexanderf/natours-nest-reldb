import { readFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';
// Read JSON file
const tours = JSON.parse(
  readFileSync(`${import.meta.dirname}/tours.json`, 'utf-8')
);
const users = JSON.parse(
  readFileSync(`${import.meta.dirname}/users.json`, 'utf-8')
);
const reviews = JSON.parse(
  readFileSync(`${import.meta.dirname}/reviews.json`, 'utf-8')
);
//npx prisma init --datasource-provider sqlite);
//console.log(import.meta.dirname);
const prisma = new PrismaClient();
const replaceIdKey = (obj) => {
  if (obj['_id'] !== undefined) {
    obj['key_id'] = obj._id;
    delete obj._id;
  }
  return obj;
};

// Import data from file to database
const importData = async () => {
  try {
    await prisma.$connect();
    Promise.all(
      users.map(async (user) => {
        user = replaceIdKey(user);
        user.role = user.role.toUpperCase().replace('-', '');
        // console.log(user);

        await prisma.user.create({
          data: user,
        });
      }),

      tours.map(async (tour) => {
        tour = replaceIdKey(tour);
        tour.locations = tour.locations.map((loc) => replaceIdKey(loc));
        // console.log(tour);
        tour.difficulty = tour.difficulty.toUpperCase();

        const guideId = Promise.all(
          tour.guides.map(async (guide) => {
            user = await prisma.user.findUnique({
              where: {
                key_id: guide,
              },
            });
            return user.id;
          })
        );

        tour.guides = guideId;

        await prisma.tour.create({
          data: tour,
        });
      })

      // reviews.map(async (review) => {
      //   review = replaceIdKey(review);
      //   // console.log(review);

      //   await prisma.review.create({
      //     data: review,
      //   });
      // })
    );
    await prisma.$disconnect();
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    await prisma.$connect();
    await prisma.user.deleteMany({});
    await prisma.tour.deleteMany({});
    await prisma.review.deleteMany({});
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  await prisma.$disconnect();
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
