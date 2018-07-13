var videoSos = {


   template: `

     <div class="videoSos">

       <img src="img/close.svg" alt="" @click="hideVideoSos" class="closeCamera">

        <div class="videoCont">

           <!--<video src="" class="cameraVideo"></video>-->
           <img src="img/sender.svg" class="sender" @click="sendVideoSos">
           <!--<button @click="sendVideoSos">Sturen</button>-->

        </div>

     </div>

   `,

   data ()
   {

      return {

        userLogged: this.$parent.userLoggegStatus,
        userIsAadmin: this.$parent.isUseradmin,
        useremail: this.$parent.userEmail,
        uploadedVideo: null

      }

   },


   created ()
   {

      this.$parent.loadStyle('videosos');

   },

   methods: {

     sendVideoSos ()
     {

        this.$parent.notification('img/redbuttonLogo.svg', 'Uw video sos is verzonden!');
        this.hideVideoSos();

     },

     hideVideoSos ()
     {

       Animations.hidePopups('videoSos');

       var videoCont = document.querySelector('.videoCont');
       var cameraVideo = document.querySelector('.cameraVideo');
       videoCont.removeChild(cameraVideo);

     }

   }

}
