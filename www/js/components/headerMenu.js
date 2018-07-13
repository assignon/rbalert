var headerMenu = {

  template: `

    <div class='menuTop'>

      <div class="logoName">

      <img src="img/redbuttonLogo.svg" alt="" class="appLogo" @click="appHome">
      <h4>R.B.Alert</h4>

      </div>
      <div class="bmenuCont" v-if="userLogged" @click="updateUser"><img src="img/user.svg" alt="" class="bMenu"></div>

   </div>

 `,


  created ()
  {

     this.$parent.loadStyle('headerMenu');

  },


  mounted ()
  {



  },


   data ()
   {

      return {

        userLogged: this.$parent.userLoggegStatus

      }

   },


   methods: {

     appHome ()
     {

       Helpers.GoHome();
       this.$store.state.users = [];
       this.$parent.templateName = 'sos';
       var tl = new TimelineMax();
       tl.staggerTo('.alerts', 1, {scale: 1, ease: Back.easeOut});

     },

     updateUser ()
     {

       this.$parent.templateName = 'userProfil';

     }

   }

};
