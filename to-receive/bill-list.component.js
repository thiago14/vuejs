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
                        <a href="#" @click.prevent="c.done = !c.done">
                            <i class="tiny material-icons">done</i>
                        </a>
                    </td>
                    <td class="center">
                        <a v-link="{name: 'bill.receive.update', params: {index: index}}" >Editar</a> |
                        <a href="#" @click.prevent="deleteBill(c)" >Deletar</a>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    data: function () {
        return {
            bills: this.$root.$children[0].billsToReceive,
            count: 0
        }
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
                return !this.count ? 'Nenhuma conta a receber' : 'Existe(m) '+ this.count + ' conta(s) a ser(em) recebida(s)';
            }
        }
    },
    methods: {
        deleteBill: function(bill) {
            if (confirm("Tem certeza que deseja deletar essa conta?")) {
                this.bills.$remove(bill)
            }
        }
    }
});
