//* ---------------------
//*   Vue FILTER LABEL
//* ---------------------
Vue.filter('doneLabel', function (value) {
    if(value) {
        return 'Paga';
    }
    return 'Não paga';
});


Vue.filter('doneLabelReceive', function (value) {
    if(value) {
        return 'Recebido';
    }
    return 'Não recebido';
});