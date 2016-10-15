Vue.http.options.root = 'http://localhost:8080/api';

window.BillPay = Vue.resource('bills-pay{/id}', {}, {
    total: { method: 'GET', url: 'bills-pay/total'}
});

window.BillReceive = Vue.resource('bills-receive{/id}', {}, {
    total: { method: 'GET', url: 'bills-receive/total'}
});