//* ---------------------
//*   Vue BILL LIST COMPONENT
//* ---------------------
window.billReceiveListComponent = Vue.extend({
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
                <tr v-for="(index, c) in bills">
                    <td>{{ index + 1 }}</td>
                    <td>{{ c.date_due }}</td>
                    <td>{{ c.name }}</td>
                    <td>{{ c.value | currency 'R$ '}}</td>
                    <td :class="{'green-text': c.done, 'red-text': !c.done}">
                        {{ c.done | doneLabelReceive }}
                        <a href="#" @click.prevent="updateBill(c)">
                            <i class="tiny material-icons">done</i>
                        </a>
                    </td>
                    <td class="center">
                        <a v-link="{name: 'bill.receive.update', params: {id: c.id}}" >Editar</a> |
                        <a href="#" @click.prevent="deleteBill(c)" >Deletar</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            bills: [],
            count: 0
        }
    },
    created: function () {
        var self = this;
        BillReceive.query().then(function (response) {
            self.bills = response.data;
        });
    },
    computed: {
        status: function () {
            this.count = null;

            if(this.bills.length == 0) {
                this.count = this.bills.length;
                return 'Nenhuma conta cadastrada';
            }else {
                for(var i in this.bills) {
                    if(!this.bills[i].done) {
                        this.count++;
                    }
                }

                if(!this.count) {
                    return 'Nenhuma conta a receber'
                }
                else if(this.count == 1) {
                    return 'Existe 1 conta a receber';
                }
                else {
                    return 'Existem '+ this.count + ' contas a receber';
                }

            }
        }
    },
    methods: {
        updateBill : function (bill) {
            bill.done = !bill.done;
            BillReceive.update({id: bill.id}, bill);
        },
        deleteBill: function(bill) {
            if (confirm("Tem certeza que deseja deletar essa conta?")) {
                var self = this;
                BillReceive.delete({id: bill.id}).then(function () {
                    self.bills.$remove(bill)
                });

            }
        }
    }
});
