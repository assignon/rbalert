

var Animations = {


   launchScreen ()
   {

     //var launchScreen = document.querySelector('.launchScreen');
    /* launchScreen.style.opacity = '1';
     launchScreen.style.width = '800px';
     launchScreen.style.height = '800px';*/

     var tl = new TimelineMax();
    /* tl.to('.launchScreen',0.8, {opacity: 1,width: '800px', height:'800px', ease: Quad.easeOut}, 0.3);
     tl.to('.launchScreen',0.5, {width: '100%', height:'100%', ease: Cubic.easeOut}, '-=0.8');
     tl.to('.launchScreen',0.5, {borderRadius: '0px', ease: Quad.easeOut}, '-=0.7');*/

     //logo animation
     tl.to('.lauchBody .logo', 1, {opacity: 1, ease: Back.easeOut},0.1);
     tl.to('.lauchBody .logo', 1, {rotationY: 0, ease: Back.easeOut},0.2);
     tl.to('.lauchBody .logo', 0.7, {left: '0px', ease: Back.easeInOut},1,'-=0.2');
     tl.to('.lauchBody .logo', 0.7, {scale: 0.8, ease: Back.easeInOut}, '-=0.7');

     //app name text animation
     tl.to('.lauchFoot p', 0.7, {opacity:1, right: '10px', ease: Back.easeInOut}, '-=0.7');

     //app home animation
     tl.to('.appCore',0.8, {opacity: 1,width: '800px', height:'800px', zIndex: '3', ease: Quad.easeOut}, 1);
     tl.to('.appCore',0.5, {width: '100%', height:'100%', ease: Cubic.easeOut});
     tl.to('.appCore',0.5, {borderRadius: '0px', ease: Quad.easeOut});

     //hide animation lauch screen
     tl.to('.launchScreen',0.1, {opacity: '0', zIndex: '0', ease: Quad.easeOut});

     //alerts button animations
     tl.staggerTo('.alerts', 1, {scale: 1, ease: Back.easeOut});

    /* tl.staggerTo('.lauchFoot p, .lauchFoot .alertIcon', 0.5, {opacity: 1, ease: Cubic.easeOut}, 0.5, 'logo +=0.3');
     tl.to('.lauchFoot .alertIcon', 0.09, {yoyo: true, rotation: 30, repeat: 7}, 'logo +=2.2');
     tl.staggerTo('.lauchFoot p, .lauchFoot .alertIcon', 0.5, {opacity:0, ease: Cubic.easeOut}, 0.5, 'logo +=3.2');
     tl.to('.lauchBody .logo', 1.2, {rotation: -90, scale: 0, ease: Back.easeIn}, 'logo +=4.5');
     tl.to('.launchScreen',0.9, {opacity: 0,zIndex: '0', ease: Quad.easeOut}, 'logo +=5.5');
     tl.to('.appCore',0.9, {opacity: 1,zIndex: '2', ease: Quad.easeOut}, 'logo +=5.6');
     tl.staggerTo('.alerts', 1, {scale: 1, ease: Back.easeOut}, 0.3, 'logo +=6');*/

   },



   displaySos ()
   {

     var tl1 = new TimelineMax();
     var tl2 = new TimelineMax();

     tl1.to('.launchScreen',1, {display: 'none', ease: Quad.easeOut});
     tl2.to('.appCore',0.9, {opacity: 1,zIndex: '2', ease: Quad.easeOut});

     tl2.staggerTo('.alerts', 1, {scale: 1, ease: Back.easeOut});

   },


   displayForm ()
   {

      var tl = new TimelineMax();

      tl.staggerTo('.alerts', 0.7, {scale: 0.8, ease: Back.easeOut});
      tl.staggerTo('.popOuts', 0, {display: 'flex', ease: Back.easeOut});

      tl.to('.formsContainer',0.7, {display: 'flex', ease: Quad.easeOut}, 0.2, "#showpopout");
      tl.to('.formBack, .loginOut',0.9, {width: '100px', height:'100px', ease: Cubic.easeOut}, '-=0.8');
      tl.to('.formBack, .loginOut',0.9, {width: '100%', height:'100%', ease: Cubic.easeOut}, '-=0.7');
      tl.to('.formBack, .loginOut',0.9, {borderRadius: '3px', ease: Quad.easeOut}, '-=0.6');
      tl.to('.loginOut',0.9, {display: 'flex', ease: Quad.easeOut}, '-=0.8');

   },


   hideForm ()
   {

     var tl = new TimelineMax();

     tl.staggerTo('.alerts', 1, {scale: 1, ease: Back.easeOut});
     tl.staggerTo('.popOuts', 0, {display: 'none', ease: Back.easeOut});
     tl.to('.loginOut',0.9, {display: 'none', ease: Quad.easeOut}, '-=0.5');

     tl.to('.formsContainer',1, {display: 'none', ease: Quad.easeOut}, 0.3);
     tl.to('.formBack, .loginOut',0.9, {width: '70%', height:'70%', ease: Cubic.easeOut}, '-=0.8');
     tl.to('.formBack, .loginOut',0.9, {width: '0px', height:'0px', ease: Cubic.easeOut}, '-=0.7');
     tl.to('.formBack, .loginOut',0.9, {borderRadius: '100%', ease: Quad.easeOut}, '-=0.6');

   },


   sosAlarm ()
   {

       var tl = new TimelineMax();

       setInterval(function(){

         tl.to('.sosAlert',0.7, {scale: 0.8, yoyo: true, repeat: 3, ease: Back.easeinOut});

       }, 3000);

   },



   callSosConfirm ()
   {

     var tl = new TimelineMax();
     tl.to('.sosAlertContainer',0.7, {scale: 1, ease: Back.easeOut});
     tl.to('.alerts',0.7, {scale: 0.7, ease: Back.easeOut}, '-=1');

   },


   hideSosConfirm ()
   {

     var tl = new TimelineMax();
     tl.to('.sosAlertContainer',0.7, {scale: 0, ease: Back.easeOut});
     tl.to('.alerts',0.7, {scale: 1, ease: Back.easeOut}, '-=0.7');

   },


   callPopups (selector)
   {

     var tl = new TimelineMax();
     tl.staggerTo('.popOuts', 0, {display: 'flex', ease: Back.easeOut}, '-=5');
     tl.to('.'+selector,0.7, {scale: 1, ease: Back.easeOut});
     tl.to('.alerts',0.7, {scale: 0.7, ease: Back.easeOut}, '-=1');

   },


   hidePopups (selector)
   {

     var tl = new TimelineMax();

     tl.to('.'+selector,0.7, {scale: 0, ease: Back.easeOut});
     tl.to('.alerts',0.7, {scale: 1, ease: Back.easeOut}, '-=0.7');
     tl.staggerTo('.popOuts', 0.2, {display: 'none', ease: Back.easeOut});

   },


   show (selector, callback)
   {

     var tl = new TimelineMax();
     tl.to(selector,0.7, {scale: 1, ease: Back.easeOut});
     callback(tl);

   },


   hide (selector, callback)
   {

     var tl = new TimelineMax();
     tl.to(selector,0.7, {scale: 0, ease: Back.easeOut});
     callback(tl);

   },


   chgColor (selector, color, delay, callback)
   {

     var tl = new TimelineMax();
     tl.to(selector,delay, {color: color, ease: Back.easeOut});
     callback(tl);

   },


   callStaggerElems (elems)
   {

      var tl = new TimelineMax();
      tl.staggerTo('.'+elems, 1, {scale: 1, ease: Back.easeOut}, 0.5);

   },


   hideStaggerElems (elems)
   {

      var tl = new TimelineMax();
      tl.staggerTo('.'+elems, 0.7, {scale: 0, ease: Back.easeOut});

   },


   callNotification ()
   {

     var tl = new TimelineMax();
     tl.to('.notificationCont',0.7, {left: '50px', ease: Back.easeOut});
     tl.to('.alerts',0.7, {scale: 0.8, ease: Back.easeOut}, '-=1');

     tl.to('.notificationCont',0.7, {left: '100%', ease: Back.easeinOut}, 5, '#hideNotification');
     tl.to('.alerts',0.7, {scale: 1, ease: Back.easeOut}, 'hideNotification');

   },


   callLoader ()
   {

     var tl = new TimelineMax();
     tl.to('.notificationCont',0.7, {left: '50px', ease: Back.easeOut});
     tl.to('.alerts',0.7, {scale: 0.8, ease: Back.easeOut}, '-=1');

   },


   hideLoader ()
   {

     var tl = new TimelineMax();
     tl.to('.notificationCont',0.7, {left: '100%', ease: Back.easeinOut});
     tl.to('.alerts',0.7, {scale: 1, ease: Back.easeOut});

   },


   hideNotification ()
   {

     var tl = new TimelineMax();
     tl.to('.notificationCont',0.7, {left: '100%', ease: Back.easeinOut});
     tl.to('.alerts',0.7, {scale: 1, ease: Back.easeOut}, '-=0.7');

   },


   loadPage(pageName)
   {

     var tl = new TimelineMax();
     tl.to('.'+pageName,0.7, {display: 'flex', ease: Back.easeOut}, '-=1');
     tl.to('.'+pageName,0.7, {left: '0px', ease: Back.easeOut});

   },


   hidePage(pageName)
   {

     var tl = new TimelineMax();
     tl.to('.'+pageName,0.7, {left: '100%', ease: Back.easeinOut});
     tl.to('.'+pageName,0.7, {display: 'flex', ease: Back.easeinOut}, '+=1');

   }


}
