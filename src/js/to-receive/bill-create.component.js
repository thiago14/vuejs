//* ---------------------
//*   Vue BILL CREATE COMPONENT
//* ---------------------

import BillReceiveModel from './BillReceiveModel'

let billReceiveCreateComponent = {
    template: `
        <div class="divider"></div>
        <div class="row">
            <div class="col s12 center">
                <h5 v-if="model.bill.id === null">Nova conta</h5>
                <h5 v-if="model.bill.id !== null">Editar conta</h5>
                <div class="divider"></div>
            </div>
        </div>
        <form class="col s12" @submit.prevent="submit">
            <div class="row">
                <div class="input-field col s6">
                    <input id="date_due" type="text" v-model="model.bill.date_due | dateFormat">
                    <label class="active" for="date_due">Vencimento</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <label class="active" for="name">Nome</label>
                    <select class="browser-default" v-model="model.bill.name" id="name">
                        <option v-for="o in contas" :value="o" >{{ o | stringUppercase }}</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <input id="value" type="text" min="1" step="any" v-model="model.bill.value | currencyFormat">
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
    data() {
        return {
            model: {},
            formType: 'insert',
            contas: [
                'salário',
                'rendimentos',
                'juros',
                'devolução',
                'atrasados'
            ]
        }
    },
    methods: {
        submit() {
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
        data() {
            this.model = new BillReceiveModel()
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
}

export default billReceiveCreateComponent
