Vue.filter('sniped', function(val){

    return val.slice(0, 15)+'...';

});


Vue.filter('snipedCustom', function(val, to){

    return val.slice(0, to)+'...';

})
