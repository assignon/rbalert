var fb = {

  dbConfig ()
  {

      var config = {
          apiKey: "AIzaSyCBsrELn5TShRC4CQ6_FMXJatd5WqX40fU",
          authDomain: "redbutton-alert.firebaseapp.com",
          databaseURL: "https://redbutton-alert.firebaseio.com",
          projectId: "redbutton-alert",
          storageBucket: "redbutton-alert.appspot.com",
          messagingSenderId: "554911665700"
        }

        return config;

  },


  initializeDb ()
  {

   //  var db = Firebase.initializeApp(this.config);
       var firebaseInit;

       if (!firebase.apps.length) {

         firebaseInit = firebase.initializeApp(fb.dbConfig());

       }else{

          firebaseInit = firebase;

       }
       return firebaseInit;

  },


  fireStore ()
  {

     var firestore = fb.initializeDb().firestore();
     const settings = {timestampsInSnapshots: true};
     firestore.settings(settings);
     return firestore;

  },


  fireStorage ()
  {

    var firestorage = fb.initializeDb().storage();
    return firestorage;

  }

}
