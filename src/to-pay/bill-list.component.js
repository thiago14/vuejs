//* ---------------------
//*   Vue BILL LIST COMPONENT
//* ---------------------
window.billListComponent = Vue.extend({
    template: `
        <h5 :class="{'grey-text': count === 0, 'green-text': !count, 'red-text': count}">{{ status }}</h5>
        <table class="bordered striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Vencimento</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th class="center">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(index, c) in model.bills">
                    <td>{{ index + 1 }}</td>
                    <td>{{ c.date_due }}</td>
                    <td>{{ c.name }}</td>
                    <td>{{ c.value | currency 'R$ '}}</td>
                    <td :class="{'green-text': c.done, 'red-text': !c.done}">
                        {{ c.done | doneLabel }}
                        <a href="#" @click.prevent="updateBill(c)">
                            <i class="tiny material-icons">done</i>
                        </a>
                    </td>
                    <td class="center">
                        <a v-link="{name: 'bill.pay.update', params: {id: c.id}}" >Editar</a> |
                        <a href="#" @click.prevent="deleteBill(c)" >Deletar</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            model: {},
            count: 0
        }
    },
    ready: function () {
        this.model = new BillsModel(BillPay)
        this.model.list()
    },
    computed: {
        status: function () {
            this.count = null

            if(this.model.bills.length == 0) {
                this.count = this.model.bills.length
                return 'Nenhuma conta cadastrada'
            }else {
                for(let i in this.model.bills) {
                    if(!this.model.bills[i].done) {
                        this.count++
                    }
                }

                if(!this.count) {
                    return 'Nenhuma conta a pagar'
                }
                else if(this.count == 1) {
                    return 'Existe 1 conta a ser paga'
                }
                else {
                    return 'Existem '+ this.count + ' contas a serem pagas'
                }
            }
        }
    },
    methods: {
        updateBill : function (bill) {
            bill.done = !bill.done
            this.model.update(bill)
        },
        deleteBill: function(bill) {
            if (confirm("Tem certeza que deseja deletar essa conta?")) {
                this.model.delete(bill)
            }
        }
    }
})
