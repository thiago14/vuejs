//* ---------------------
//*   Vue BILL LIST COMPONENT
//* ---------------------
<template>
    <div class="section">
        <div class="row">
            <div class="col s6">
                <div class="card z-depth-2">
                    <div class="card-content ">
                        <p class="card-title valign-wrapper">
                            <i class="material-icons left">account_balance</i><span class="valign">Contas a Pagar</span>
                        </p>
                        <h5 :class="{'grey-text': model.count === 0, 'green-text': !model.count, 'red-text': model.count}">{{ model.status }}</h5>
                    </div>
                </div>
            </div>
            <div class="col s6">
                <div class="card z-depth-2">
                    <div class="card-content ">
                        <p class="card-title valign-wrapper">
                            <i class="material-icons left">payment</i><span class="valign">Total a Pagar</span>
                        </p>
                        <h5 class="right-align">{{ model.total | currencyFormat }}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="section">
        <div class="divider"></div>
        <div class="row">
            <div class="col s12">
                <h5 class="center-align">Lista de contas</h5>
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
                {{ c.done | doneLabel }}
                <a href="#" @click.prevent="updateBill(c)">
                    <i class="tiny material-icons">done</i>
                </a>
            </td>
            <td class="center">
                <a v-link="{name: 'bill.pay.update', params: {id: c.id}}" >Editar</a> |
                <a href="#" @click.prevent="openModalDelete(c)" >Deletar</a>
            </td>
        </tr>
        </tbody>
    </table>
    <modal :modal="'modal-delete'" v-if="model.id">
        <div slot="message">
            <p><strong>Tem certeza que deseja deletar essa conta?</strong></p>
            <div class="divider"></div>
            <p>Name: <strong>{{model.bill.name | stringUppercase}}</strong></p>
            <p>Valor: <strong>{{model.bill.value | currencyFormat}}</strong></p>
            <p>Data de vencimento: <strong>{{model.bill.date_due | dateFormat}}</strong></p>
        </div>
        <button class="modal-action modal-close modal-action waves-effect waves-green btn-flat green" slot="confirm" @click="deleteBill()">Confirmar</button>
    </modal>
</template>
<script type="text/javascript">
    import BillPayModel from './BillPayModel'
    import ModalComponent from '../modal.vue'

    export default {
        components: {
            modal: ModalComponent
        },
        data() {
            return {
                model: {}
            }
        },
        ready() {
            this.model = new BillPayModel()
            this.model.list()
            this.model.totalBill()
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
</script>