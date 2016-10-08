//* ---------------------
//*   Vue APP COMPONENT
//* ---------------------
window.dashboardComponent = Vue.extend({
    template: `
    <div class="container">
        <div class="col s12 m6">
            <div class="collection">
                <a v-link="{name: 'bill.pay.list'}" class="collection-item">
                    <span class="red-text">Despesa</span>
                    <span class="badge red white-text">{{ despesas | currency '-R$ '}}</span>
                </a>
                <a v-link="{name: 'bill.receive.list'}" class="collection-item">
                    Receita
                    <span class="badge blue white-text">{{ receita | currency 'R$ '}}</span>
                </a>
                <p class="collection-item">
                    Total:
                    <span class="badge" :class="{'grey-text': receita - despesas === 0, 'green-text': (receita - despesas) > 0, 'red-text': (receita - despesas) < 0}">{{ receita - despesas| currency 'R$ '}}</span>
                </p>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            despesas: 0,
            receita: 0,
            total: 0
        }
    },
    created: function () {
        var self = this;
        BillPay.total().then(function (response) {
            self.despesas = response.data.total;
        });
        BillReceive.total().then(function (response) {
            self.receita = response.data.total;
        });
    }
});
