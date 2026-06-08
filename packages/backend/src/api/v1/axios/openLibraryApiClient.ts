import axios from 'axios';

export const openLibraryApiClient = axios.create({
  baseURL: 'https://openlibrary.org',
  timeout: 30000,
  headers: {
    'User-Agent': 'Katieeitak (nyjets004@gmail.com)',
  },
});
