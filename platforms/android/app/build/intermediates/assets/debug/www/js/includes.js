function includes()
{


  var libsArr  = [

    'MongOGX/collection.mongogx',
    'MongOGX/database.mongogx',
    'MongOGX/core.mongogx',
    'greensock/src/minified/TimelineLite.min',
    'greensock/src/minified/TimelineMax.min',
    'greensock/src/minified/TweenMax.min',

  ];


  var componentArr = [

    'headerMenu',
    'notifications',
    'alerts',
    'forms',
    'messages',
    'msgsContents',
    'sos',
    'textSos',
    'appMenu'

  ];


  var filesArr = [

    'js/animations',
    'js/db',
    'js/users',
    'js/helpers'

     ];


    /* libsArr.forEach(function(files)
     {

       var libs = document.createElement('script');
       libs.setAttribute('type', 'text/javascript')
       libs.setAttribute('src', '../www/libs/'+files+'.js')
       document.body.appendChild(libs)

     })*/



     componentArr.forEach(function(files)
     {

       var components = document.createElement('script');
       components.setAttribute('type', 'text/javascript')
       components.setAttribute('src', 'js/components/'+files+'.js')
       document.body.appendChild(components)

     })



    filesArr.forEach(function(files)
    {

       var scripts = document.createElement('script');
       scripts.setAttribute('type', 'text/javascript')
       scripts.setAttribute('src', files+'.js')
       document.body.appendChild(scripts)

    })

}


includes()
