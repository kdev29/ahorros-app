// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   ahorrosAPI: "http://192.168.100.15:8012",
//   getAllAWS: "https://600c3ec3-524e-404e-bbd6-84d0c27f482e.mock.pstmn.io/getall",
//   getSingleAWS :"https://600c3ec3-524e-404e-bbd6-84d0c27f482e.mock.pstmn.io/",
//   guardarMovimientoAWS: 'https://7zoaxsx211.execute-api.us-east-1.amazonaws.com/DEV'
// };

export const environment = {
  production: false,
  ahorrosAPI: "http://192.168.100.15:8012",
  getAllAWS: "https://7zoaxsx211.execute-api.us-east-1.amazonaws.com/DEV",
  getSingleAWS :"https://600c3ec3-524e-404e-bbd6-84d0c27f482e.mock.pstmn.io/",
  guardarMovimientoAWS: 'https://7zoaxsx211.execute-api.us-east-1.amazonaws.com/DEV',
  getToken: 'https://7zoaxsx211.execute-api.us-east-1.amazonaws.com/DEV/token'
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
