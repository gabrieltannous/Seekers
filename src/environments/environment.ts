// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: 'AIzaSyBABKKZen_4awGglx5ILfCgvUpPeKwL5WI',
    authDomain: 'seekers-uts.firebaseapp.com',
    databaseURL: 'https://seekers-uts.firebaseio.com',
    projectId: 'seekers-uts',
    storageBucket: 'seekers-uts.appspot.com',
    messagingSenderId: '844981083345'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
