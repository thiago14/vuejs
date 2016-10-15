//* ---------------------
//*   Vue FILTER LABEL
//* ---------------------
Vue.filter('doneLabel', (value) => (value) ? 'Paga': 'Não paga' )

Vue.filter('doneLabelReceive', (value) => (value) ? 'Recebido' : 'Não recebido' )