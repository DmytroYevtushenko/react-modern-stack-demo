import axios, { AxiosError } from 'axios';

import fs from 'fs';

const fetchAndSeed = async () => {
  const numberOfPages = 5;
  let allCharacters = [];
  try {
    for (let i = 0; i < numberOfPages; i++) {
      console.log('Fetching data from Rick and Morty API...');
      const { data } = await axios.get('https://rickandmortyapi.com/api/character', {
        params: {
          page: i + 1
        }
      })
      allCharacters.push(...data.results);
    }

    const db = {
      characters: allCharacters
    };

    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    console.log('Success! Data written to db.json');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  }
};

fetchAndSeed();