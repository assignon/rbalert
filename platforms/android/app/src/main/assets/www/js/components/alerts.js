var alerts = {

  template: `

    <div class="sosContainer">

      <div class="alerts" @click="isUserLogged(textSos)">

          <div class="imgAlertsCont" id='txtsos'><img src="img/textsos.svg" alt=""></div>

      </div>


      <div class="alerts">

        <div class="sosCont" @click="isUserLogged(sos)"><img src="img/redbuttonLogo.svg" alt="" class="sos" @click="isUserLogged(sos)"></div>
        <div class="imgAlertsCont" @click="isUserLogged(cameraSos)" id='camsos'><img src="img/camerasos.svg" alt ></div>

      </div>


      <div class="alerts" @click="isUserLogged(videoSos)">

         <div class="imgAlertsCont" id='vidsos'><img src="img/videosos.svg" alt=""></div>

      </div>

    </div>

  `,

 created ()
 {

   this.$parent.loadStyle('alerts');
   var tl = new TimelineMax();
   tl.staggerTo('.alerts', 1, {scale: 1, ease: Back.easeOut});

 },


 mounted ()
 {

   //var tl = new TimelineMax();
  // tl.staggerTo('.alerts', 1, {scale: 1, ease: Back.easeOut});

 },


  data ()
  {

     return {

        userLogged: this.$parent.userLoggegStatus,
        sosType: null

     }

  },


  methods: {


      isUserLogged (sosType)
      {

         this.sosType = sosType;

         if(this.userLogged)
         {

           sosType();

         }else{

           Animations.displayForm();

         }

      },



      chgUserState ()
      {

        this.userLogged = true;

      },



      sos ()
      {

         Animations.callPopups('sosAlertContainer');

       /*  firebase.fireStore().collection('sos').add({

           'date_sended': '29/03/2018 12:00:00 AM',
           'sosType': 'sos',
           'sosContent': 'Helppp!!!',
           'user': this.userEmail

         })
         .then(docRef =>{

           alert(`sos with id ${docRef.id} sended`);

         })
         .catch(error => {

           console.log(err);

         })*/

      },



      textSos ()
      {

         Animations.callPopups('sosTextContainer');

      },



      cameraSos ()
      {


         var self = this;
         document.addEventListener('deviceready', function(){

             var cameraOpts = {

                 quality: 50,
                 destinationType: Camera.DestinationType.DATA_URL,
                 sourceType: Camera.PictureSourceType.CAMERA,
                 encodingType: Camera.EncodingType.JPEG,
                 mediaType: Camera.MediaType.PICTURE,
                 CAMERAdirection: Camera.Direction.BACK,
                 allowEdit: true,
                 correctOrientation: true,
                 targetWidth: 500,
                 targetHeight: 500

               };

              navigator.camera.getPicture(

                 function(imageUri){

                    var cameraFoto = document.querySelector('.cameraFoto');
                    cameraFoto.src = "data:image/jpeg;base64," + imageUri;
                    self.$store.state.uploadedImg = imageUri;
                    Animations.callPopups('camerasos');

                 }, function(error){

                    self.$parent.notification('img/redbuttonLogo.svg', 'De upload van de foto is niet gelukt!');

                 }, cameraOpts

            );


        });

    },



      videoSos ()
      {

          var self = this;
          document.addEventListener('deviceready', function(){

              var videoOpts = {

                 limit: 1,
                 duration: 120,
                 quality: 0

              };
              navigator.device.capture.captureVideo(function(mediaFiles){

                   var fileUrl = mediaFiles[0].fullPath;
                   mediaFiles[0].getFormatData.width = 300;
                   var ft = new FileTransfer();

                   var cameraVideo = document.querySelector('.videoCont');
                   var video = document.createElement('video');
                   video.className = 'cameraVideo';
                   video.controls = 'controls';
                   var videoSrc = document.createElement('source');
                   videoSrc.src = fileUrl;
                   video.appendChild(videoSrc);
                   cameraVideo.appendChild(video);
                  // cameraVideo.src = fileUrl;
                   self.$store.state.uploadedVideo = fileUrl;
                   Animations.callPopups('videoSos');
                   ft.upload(fileUrl, encodeURI("https://console.firebase.google.com/project/redbutton-alert/storage/redbutton-alert.appspot.com"),function(res){

                     console.log(res.responseCode);
                     console.log(res.response);
                     console.log(res.bytesSent);

                   }, function(err){

                     console.log(err.code);
                     console.log(err.source);
                     console.log(err.target);

                   })
                   mediaFiles[0].getFormatData(function(file){

                    console.log(file);

                   },function(error){

                     console.log(error);

                   })

              }, function(error){

                self.$parent.notification('img/redbuttonLogo.svg', 'De upload van de video is niet gelukt!');

              }, videoOpts);

          })

      }


  }



}
