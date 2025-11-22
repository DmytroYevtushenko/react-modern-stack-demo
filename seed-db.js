import axios, { AxiosError } from 'axios';

import fs from 'fs';

const fetchAndSeed = async () => {
  try {
    console.log('Fetching data from Rick and Morty API...');
    const { data } = await axios.get('https://rickandmortyapi.com/api/character');

    const db = {
      characters: data.results
    };

    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    console.log('Success! Data written to db.json');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

fetchAndSeed();