var model_bill = {
    date_due: '',
    name: '',
    value: null,
    done: 0
};

Vue.filter('doneLabel', function (value) {
    if(value == 0)
    {
        return 'Não paga';
    }else{
        return 'Paga';
    }

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
        bill: model_bill,
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
        bills: [
            {date_due: '20/09/2016', name: 'Conta de luz', value: 70.00, done: 1},
            {date_due: '20/09/2016', name: 'Conta de agua', value: 40.28, done: 0},
            {date_due: '20/09/2016', name: 'Conta de Telefone', value: 140.50, done: 0},
            {date_due: '20/09/2016', name: 'DAS', value: 49.00, done: 0},
            {date_due: '16/09/2016', name: 'Seguro de vida', value: 49.00, done: 0}
        ]
    },
    computed: {
        status: function () {
            var count = 0;
            for(var i in this.bills) {
                if(!this.bills[i].done) {
                    count++
                }
            }
            return !count ? 'Nenhuma conta a pagar' : 'Existem '+ count + ' contas a serem pagas';
        }
    },
    methods: {
        showView: function (id) {
            this.activedView = id
            if(id == 1) {
                this.formType = 'insert'
            }
        },
        submit: function () {
            if(this.formType === 'insert') {
                this.bills.push(this.bill);
            }
            this.bill = model_bill;
            this.activedView = 0;
        },
        loadBill: function (bill) {
            this.bill = bill;
            this.activedView = 1;
            this.formType = 'update';
        },
        deleteBill: function(index)
        {
            var r = confirm("Tem certeza que deseja deletar essa conta?");
            if (r == true) {
                this.bills.splice(index, 1)
            }

        }
    }
});