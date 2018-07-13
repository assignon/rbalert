var appMenu = {

  template: `

    <div class='appMenu'>

      <!--<div class="moreMenuItems">

         <div class="menuIconCont"><img src="img/user.svg" alt=""></div>
         <p>Gebruiker</p>

      </div>-->


      <div class="moreMenuItems" @click="renderPage($event, 'img/newred.svg', 'novelty')">

         <div class="menuIconCont"><img src="img/new.svg" alt=""></div>
         <p>Nieuwigheid</p>

      </div>


      <div class="moreMenuItems" @click="renderPage($event, 'img/infored.svg', 'infoPage')">

         <div class="menuIconCont"><img src="img/info.svg" alt=""></div>
         <p>info</p>

      </div>


      <div class="moreMenuItems">

         <div class="menuIconCont"><img src="img/settings.svg" alt=""></div>
         <p>Instellingen</p>

      </div>


      <!--<div class="moreMenuItems">

         <div class="menuIconCont"><img src="img/users.svg" alt=""></div>
         <p>Gebruikers</p>

      </div>-->


      <div class="moreMenuItems" v-if="!userLogged" @click="login">

         <div class="menuIconCont"><img src="img/login.svg" alt=""></div>
         <p>Login</p>

      </div>


      <div class="moreMenuItems" v-else @click="logOut">

         <div class="menuIconCont"><img src="img/logout.svg" alt=""></div>
         <p>Uitlogen</p>

      </div>


      <!--<div class="moreMenuItems">

         <div class="menuIconCont"><img src="img/more.svg" alt=""></div>
         <p>Meer</p>

      </div>-->

   </div>

 `,


  created ()
  {

     this.$parent.loadStyle('appMenu');

  },


   data ()
   {

      return {

        userLogged: this.$parent.userLoggegStatus

      }

   },


   methods: {

     login ()
     {

        Animations.displayForm();

     },


     logOut ()
     {

       var self = this;
       this.$parent.templateName = 'sos';
       fb.initializeDb().auth().signOut().then(function() {

           this.useremail = null;
           window.localStorage.removeItem('userEmail');
           window.localStorage.removeItem('userId');
           window.localStorage.removeItem('admin');
           this.userLogged = false;
           //this.$parent.chgUserState (this.userLogged);
           var appChilds = self.$parent.$children;

           appChilds.forEach(function(childs)
           {

             childs.userLogged = false;

           })

       })

     },


     renderPage (e,menuImg,pageName)
     {

       this.$parent.templateName = 'sos';
       Helpers.renderPages(pageName);
       var menuName = e.currentTarget.childNodes[2];
       var curMenuImg = e.currentTarget.childNodes[0].childNodes[0];
       var moreMenuItems = document.querySelectorAll('.moreMenuItems');

       for (var i = 0; i < moreMenuItems.length; i++) {

         var srcs = moreMenuItems[i].childNodes[0].childNodes[0].src;
         moreMenuItems[i].childNodes[0].childNodes[0].src = srcs;

       }

       /*Animations.chgColor('.moreMenuItems p', '#b6b6b6', 0.1, function(tl){

         tl.to(menuName, 0.1, {color: '#fc0e26'});
         curMenuImg.src = menuImg;

       })*/

     },


     menuState (target)
     {

       var menuIcon = target.childNodes[1].childNodes[1];
       var menuName = target.childNodes[3];

     }

   }

};
