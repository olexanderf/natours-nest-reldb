import fs from 'fs';
import { PrismaClient } from '@prisma/client';
// Read JSON file
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// console.log(import.meta.dirname);
const users = JSON.parse(
  fs.readFileSync(`${import.meta.dirname}/users.json`, 'utf-8')
);
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );
// console.log(prisma);

const prisma = new PrismaClient();
await prisma.$connect();
// Import data from file to database
const importData = async () => {
  try {
    Promise.all(
      users.map(async (userItem) => {
        userItem['key_id'] = userItem._id;
        delete userItem._id;
        userItem.role = userItem.role.toUpperCase().replace('-', '');
        // console.log(userItem);
        await prisma.user.create({ data: userItem });
      })
    );
    // await Tour.create(tours);
    // await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  await prisma.$disconnect();
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    /*     await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
  */ console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
