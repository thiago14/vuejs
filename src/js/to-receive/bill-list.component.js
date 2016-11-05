//* ---------------------
//*   Vue BILL LIST COMPONENT
//* ---------------------

import BillReceiveModel from './BillReceiveModel'
import ModalComponent from '../modal.component'

let billReceiveListComponent = {
    components: {
        modal: ModalComponent
    },
    template: `
        <div class="section">
            <div class="row">
                <div class="col s6">
                    <div class="card z-depth-2">
                        <div class="card-content ">
                            <p class="card-title valign-wrapper">
                                <i class="material-icons left">account_balance</i><span class="valign">Contas a Receber</span>
                            </p>
                            <h5 :class="{'grey-text': count === 0, 'green-text': !count, 'red-text': count}">{{ status }}</h5>
                        </div>
                    </div>
                </div>
                <div class="col s6">
                    <div class="card z-depth-2">
                        <div class="card-content ">
                            <p class="card-title valign-wrapper">
                                <i class="material-icons left">payment</i><span class="valign">Total a Receber</span>
                            </p>
                            <h5 class="right-align">{{ total | currencyFormat }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="divider"></div>
            <div class="row">
                <div class="col s12">
                    <h5 class="center">Lista de contas</h5>
                    <div class="divider"></div>
                </div>
            </div>
        </div>
        <table class="bordered striped z-depth-2">
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
                    <td>{{ c.date_due | dateFormat }}</td>
                    <td>{{ c.name | stringUppercase }}</td>
                    <td>{{ c.value | currencyFormat }}</td>
                    <td :class="{'green-text': c.done, 'red-text': !c.done}">
                        {{ c.done | doneLabelReceive }}
                        <a href="#" @click.prevent="updateBill(c)">
                            <i class="tiny material-icons">done</i>
                        </a>
                    </td>
                    <td class="center">
                        <a v-link="{name: 'bill.receive.update', params: {id: c.id}}" >Editar</a> |
                        <a href="#" @click.prevent="openModalDelete(c)" >Deletar</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <modal :modal="'modal-delete'"">
            <div slot="message">
                <p><strong>Tem certeza que deseja deletar essa entrada?</strong></p>
                <div class="divider"></div>
                <p>Name: <strong>{{model.bill.name | stringUppercase}}</strong></p>
                <p>Valor: <strong>{{model.bill.value | currencyFormat}}</strong></p>
                <p>Data de vencimento: <strong>{{model.bill.date_due | dateFormat}}</strong></p>
            </div>
            <button class="modal-action modal-close modal-action waves-effect waves-green btn-flat green" slot="confirm" @click="deleteBill()">Confirmar</button>
        </modal>
    `,
    data() {
        return {
            count: 0,
            model: {},
            total: 0
        }
    },
    ready() {
        this.model = new BillReceiveModel()
        this.model.list()
        this.model.total().then((response) => {
            this.total = response.data.total
        })
    },
    computed: {
        status() {
            this.count = null;

            if(this.model.bills.length == 0) {
                this.count = this.model.bills.length
                return 'Sem registros'
            }else {
                for(let i in this.model.bills) {
                    if(!this.model.bills[i].done) {
                        this.count++
                    }
                }

                if(!this.count) {
                    return 'Nenhuma conta'
                }
                else if(this.count == 1) {
                    return 'Há 1 conta'
                }
                else {
                    return 'Há ' + this.count + ' contas'
                }
            }
        }
    },
    methods: {
        updateBill(bill) {
            bill.done = !bill.done
            this.model.update(bill)
        },
        deleteBill() {
            this.model.delete(this.model.bill)
        },
        openModalDelete(bill){
            this.model.bill = bill
            $('#modal-delete').openModal()
        }
    }
}

export default billReceiveListComponent
