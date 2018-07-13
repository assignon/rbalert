var notification = {

   template: `

     <div class="notificationCont">

        <div class="notificationIcon">

           <img :src='notificationIcon' alt="" class="notifIcon">

        </div>

        <div class="notificationContent">

           <p class="notifContent">{{ notifContent }}</p>

        </div>

     </div>

   `,


     data ()
     {

       return {

          notifContent: null,
          notificationIcon: null

       }

     },


     created ()
     {

        this.$parent.loadStyle('notifications');

     },


     methods: {

         notificationContent (icon, content)
         {

            this.notifContent = content;
            this.notificationIcon = icon;

         }

     }

}
