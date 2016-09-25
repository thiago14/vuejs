//* ---------------------
//*   Vue FILTER LABEL
//* ---------------------
Vue.filter('doneLabel', function (value) {
    if(value) {
        return 'Paga';
    }
    return 'Não paga';

});