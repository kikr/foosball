// For development
let FIREBASE_API_KEY = 'AIzaSyAGOUw0bgZgCOs-0IFGUf_h6sqF4xhxJbY';
let FIREBASE_PROJECT_ID = 'reactive-learning';

if (process.env.NODE_ENV === 'production') {
  FIREBASE_API_KEY = '';
  FIREBASE_PROJECT_ID = '';
}

if (process.env.NODE_ENV === 'development') {
  // Hide the yellow warning box since it constantly keeps hiding my UI
  console.disableYellowBox = true;
  // Consider hiding only specific options
  // console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
}

const settings = {
  env: process.env.NODE_ENV,
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
};

export default settings;
