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
                    <span class="badge">{{ despesas - receita | currency 'R$ '}}</span>
                </p>
            </div>
        </div>
    </div>
    `,
    computed: {
        despesas: function () {
            var total = 0,
                billsToPay = this.$root.$children[0].billsToPay;
            if(billsToPay.length != 0) {
                for(var i in billsToPay) {
                    total += parseFloat(billsToPay[i].value);
                }
                return parseFloat(total).toFixed(2);
            }
        },
        receita: function () {
            var total = 0,
                billsToReceive = this.$root.$children[0].billsToReceive;
            if(billsToReceive.length != 0) {
                for(var i in billsToReceive) {
                    total += parseFloat(billsToReceive[i].value);
                }
                return parseFloat(total).toFixed(2);
            }
        }
    }
});
