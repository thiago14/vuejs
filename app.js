Vue.filter('doneLabel', function (value) {
    if(value) {
        return 'Paga';
    }
    return 'Não paga';

});

var app = new Vue({
    el: "#app",
    data: {
        title: 'Contas a receber',
        menus: [
            { id: 0, name: 'Lista de contas'},
            { id: 1, name: 'Criar conta'}
        ],
        activedView: 0,
        formType: 'insert',
        bill: {},
        count: 0,
        contas: [
            'Conta de luz',
            'Conta de agua',
            'Conta de Telefone',
            'Supermercado',
            'Cartão',
            'Combustivel',
            'DAS',
            'Seguro de vida'
        ],
        bills: []
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
        showView: function (id) {
            this.activedView = id;
            if(id == 1) {
                this.formType = 'insert';
                this.bill = {
                    date_due: '',
                    name: '',
                    value: null,
                    done: false
                };
            }
        },
        submit: function () {
            if(this.formType === 'insert') {
                this.$data.bills.push(this.bill);
            }
            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function(index) {
            var r = confirm("Tem certeza que deseja deletar essa conta?");
            if (r == true) {
                this.bills.splice(index, 1)
            }
        }
    }
});