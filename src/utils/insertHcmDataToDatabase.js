const csvToJSON = require('csvtojson');
const path = require('path');
const { addDoc, collection, getFirestore } = require('firebase/firestore');
const { initializeApp } = require('firebase/app');

const initialiseDatabase = () => getFirestore(initializeApp({
  apiKey: 'AIzaSyDGrP1QWYsQqLFAoev-AHjAQKq4aal9q_M',
  authDomain: 'advwebdevproject-7d239.firebaseapp.com',
  projectId: 'advwebdevproject-7d239',
  storageBucket: 'advwebdevproject-7d239.appspot.com',
  messagingSenderId: '683529124490',
  appId: '1:683529124490:web:9105469d5ed03da2350b73'
}));

const parseData = async (filePath) => {
  const items = [];

  await csvToJSON()
    .fromFile(path.resolve(filePath))
    .then((source) => {
      source.forEach((row) => {
        Object.keys(row).forEach((key) =>
          row[key] === '' ? delete row[key] : row[key] = convertKey(row[key]));

        items.push(row);
      });
    });

  return items;
};

const convertKey = (key) => {
  switch (true) {
    case key === '0':
      return false;
    case key === '1':
      return true;
    case key.search(/(\d+(?:\.\d+)?)/) !== -1:
      return Number(key);
    default:
      return key;
  }
};

const addItemsToDatabase = async (database, data) => {
  const tasks = [];
  data.forEach((item) => tasks.push(addDoc(collection(database, 'hcmData'), item)));

  try {
    await Promise.all(tasks);
    console.log('All items added to database');
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
};

(async () => {
  console.log('Beginning to parse data');
  // relative path needs to be written from the root of the project
  // if being run from package.json script, otherwise path needs
  // to be relative to this file being run
  const data = await parseData('./hcm_data.csv');

  console.log('Beginning to add items to database');
  addItemsToDatabase(initialiseDatabase(), data);
})();
