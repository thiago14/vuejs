Vue.http.options.root = 'http://localhost:8080/api'

let Bill = {}
Bill.pay = Vue.resource('bills-pay{/id}', {}, {
    total: { method: 'GET', url: 'bills-pay/total'}
})

Bill.receive = Vue.resource('bills-receive{/id}', {}, {
    total: { method: 'GET', url: 'bills-receive/total'}
})

export default Bill