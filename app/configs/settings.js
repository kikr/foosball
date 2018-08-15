// For development
let FIREBASE_API_KEY = 'AIzaSyAGOUw0bgZgCOs-0IFGUf_h6sqF4xhxJbY';
let FIREBASE_PROJECT_ID = 'reactive-learning';

if (process.env.NODE_ENV === 'production') {
  FIREBASE_API_KEY = '';
  FIREBASE_PROJECT_ID = '';
}

const settings = {
  env: process.env.NODE_ENV,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
};

export default settings;
