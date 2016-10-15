//* ---------------------
//*   Vue BILL CREATE COMPONENT
//* ---------------------
window.billReceiveCreateComponent = Vue.extend({
    template: `
        <form class="col s12" @submit.prevent="submit">
            <div class="row">
                <div class="input-field col s6">
                    <input id="date_due" type="text" v-model="model.bill.date_due">
                    <label class="active" for="date_due">Vencimento</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <label class="active" for="name">Nome</label>
                    <select class="browser-default" v-model="model.bill.name" id="name">
                        <option v-for="o in contas" :value="o" >{{ o }}</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="value" type="number" min="1" step="any" v-model="model.bill.value">
                    <label class="active" for="value">Value</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="done" type="checkbox" v-model="model.bill.done">
                    <label class="active" for="done">Recebido</label>
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
            model: {},
            formType: 'insert',
            contas: [
                'Salário',
                'Rendimentos',
                'Juros',
                'Devolução',
                'Atrasados'
            ]
        }
    },
    methods: {
        submit: function () {
            if(this.formType === 'insert') {
                this.model.save()
                    .then(() => {
                        this.$router.go({ name: 'bill.receive.list'})
                    })
            }
            else {
                this.model.update()
                    .then(() => {
                        this.$router.go({ name: 'bill.receive.list'})
                    })
            }
        }
    },
    route: {
        data: function () {
            this.model = new BillsModel(BillReceive)
            if(this.$route.name === 'bill.receive.update')
            {
                this.formType = 'update'
                this.model.find(this.$route.params.id)
                return
            }else{
                this.model.resetBill()
                this.formType = 'insert'
            }
        }
    }
});
