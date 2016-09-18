//* ---------------------
//*   Vue FILTER LABEL
//* ---------------------
Vue.filter('doneLabel', function (value) {
    if(value) {
        return 'Paga';
    }
    return 'Não paga';

});

//* ---------------------
//*   Vue BILL CREATE COMPONENT
//* ---------------------
var billCreateComponent = Vue.extend({
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
            if(this.formType === 'insert') {
                this.$dispatch('new-bill', this.bill);
            }
            this.$dispatch('change-activeView', 0);
        },
    },
    events: {
        'change-formType': function (formType) {
            if(formType == 'insert')
            {
                this.bill = {
                    date_due: '',
                    name: '',
                    value: null,
                    done: false
                };
            }
            this.formType = formType
        },
        'change-bill': function (bill) {
            this.bill = bill
        }
    }
});

//* ---------------------
//*   Vue BILL LIST COMPONENT
//* ---------------------
var billListComponent = Vue.extend({
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
                        {{ c.done | doneLabel }}
                        <a href="#" @click.prevent="c.done = !c.done">
                            <i class="tiny material-icons">done</i>
                        </a>
                    </td>
                    <td class="center">
                        <a href="#" @click.prevent="loadBill(c)" >Editar</a> |
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
                return !this.count ? 'Nenhuma conta a pagar' : 'Existe(m) '+ this.count + ' conta(s) a ser(em) paga(s)';
            }
        }
    },
    methods: {
        loadBill: function (bill) {
            this.$dispatch('change-bill', bill);
            this.$dispatch('change-activeView', 1);
            this.$dispatch('change-formType', 'update');
        },
        deleteBill: function(bill) {
            if (confirm("Tem certeza que deseja deletar essa conta?")) {
                this.bills.$remove(bill)
            }
        }
    },
    events: {
        'new-bill': function (bill) {
            this.bills.push(bill)
        }
    }
});

//* ---------------------
//*   Vue MENU COMPONENT
//* ---------------------
var menuComponent = Vue.extend({
    template: `
        <nav class="blue lighten-2">
            <div class="nav-wrapper">
                <ul id="nav-mobile" class="left">
                    <li v-for="m in menus">
                        <a href="#" @click.prevent="showView(m.id)">{{ m.name }}</a>
                    </li>
                </ul>
            </div>
        </nav>
    `,
    data: function () {
        return {
            menus: [
                { id: 0, name: 'Lista de contas'},
                { id: 1, name: 'Criar conta'}
            ],
        }
    },
    methods: {
        showView: function (id) {
            this.$dispatch('change-activeView', id);
            if(id == 1) {
                this.$dispatch('change-formType', 'insert');
            }
        },
    }
});

//* ---------------------
//*   Vue APP COMPONENT
//* ---------------------
Vue.component('app-component', {
    components: {
        'bill-create-component': billCreateComponent,
        'bill-list-component': billListComponent,
        'menu-component': menuComponent
    },
    template: `
        <div class="container">
            <h1>{{ title }}</h1>
            <menu-component></menu-component>
            <br>
            <div class="row" v-show="activedView === 0">
                <bill-list-component></bill-list-component>
            </div>
            <div class="row" v-show="activedView === 1">
                <bill-create-component :bill.sync="bill"></bill-create-component>
            </div>
        </div>`,
    data: function () {
        return {
            title: 'Contas a receber',
            activedView: 0
        };
    },
    events: {
        'change-activeView': function (activeView) {
            this.activedView = activeView;
        },
        'change-formType': function (formType) {
            this.$broadcast('change-formType', formType);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        },
        'new-bill': function (bill) {
            this.$broadcast('new-bill', bill);
        }
    }
});

//* ---------------------
//*   Vue INIT APP
//* ---------------------
var app = new Vue({
    el: "#app"
});