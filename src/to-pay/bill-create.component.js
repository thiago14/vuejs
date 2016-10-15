//* ---------------------
//*   Vue BILL CREATE COMPONENT
//* ---------------------
window.billCreateComponent = Vue.extend({
    template: `
        <form class="col s12" @submit.prevent="submit">
            <div class="row">
                <div class="input-field col s6">
                    <input id="date_due" type="text" v-model="bill.date_due">
                    <label class="active" for="date_due">Vencimento</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <label class="active" for="name">Nome</label>
                    <select class="browser-default" v-model="bill.name" id="name">
                        <option v-for="o in contas" :value="o" >{{ o }}</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="value" type="number" min="1" step="any" v-model="bill.value">
                    <label class="active" for="value">Value</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="done" type="checkbox" v-model="bill.done">
                    <label class="active" for="done">Paga</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <button class="btn waves-effect waves-light" type="submit">Enviar
                    </button>
                </div>
            </div>
        </form>
    `,
    data: function () {
        return {
            bill: {},
            formType: 'insert',
            contas: [
                'Conta de luz',
                'Conta de agua',
                'Conta de Telefone',
                'Supermercado',
                'Cartão',
                'Combustivel',
                'DAS',
                'Seguro de vida'
            ]
        }
    },
    methods: {
        submit: function () {
            var self = this;
            if(this.formType === 'insert') {
                BillPay.save({}, this.bill).then(function () {
                    self.$router.go({ name: 'bill.pay.list'});
                })
            }
            else {
                BillPay.update({id: this.bill.id}, this.bill).then(function () {
                    self.$router.go({ name: 'bill.pay.list'});
                })
            }
        }
    },
    route: {
        data: function () {
            if(this.$route.name === 'bill.pay.update')
            {
                this.formType = 'update';
                var self = this;
                BillPay.get({id: this.$route.params.id}).then(function (response) {
                   self.bill = response.data;
                });
                return;
            }else{
                this.bill = {
                    date_due: '',
                    name: '',
                    value: null,
                    done: false
                };
                this.formType = 'insert';
            }
        }
    }
});
