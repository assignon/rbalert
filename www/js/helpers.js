var Helpers = {

   pageNameArr: [],
   renderTemplate (tempName)
   {

      var appContent = document.querySelector('.appContent');
      //var component = document.createElement(tempName);
      var component = document.querySelector(tempName);

      appContent.innerHTML = component;

   },


   renderPages (pageName)
   {

      /*  var pages = document.querySelectorAll('.pageLink');

        for (var i = 0; i < pages.length; i++) {

          var pageArr = pages[i];
          pageArr.addEventListener('click', function(e)
          {*/

             //var curPage = e.currentTarget.id;
             if(Helpers.pageNameArr.length != 0)
             {

                var oldPage = Helpers.pageNameArr[0];
                Helpers.pageNameArr.shift();
                Helpers.pageNameArr.push(pageName);
                Animations.hidePage(oldPage);
                Animations.loadPage(pageName);

             }else{

               Helpers.pageNameArr.push(pageName);
               Animations.loadPage(pageName);

             }

      /*   })

      }*/

   },


   GoHome ()
   {

      if(Helpers.pageNameArr.length != 0)
      {

         var oldPage = Helpers.pageNameArr[0];
         Helpers.pageNameArr.shift();
         Animations.hidePage(oldPage);
         Animations.sosAlarm();

      }else{

        Animations.sosAlarm();

      }

   }

}
