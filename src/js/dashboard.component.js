//* ---------------------
//*   Vue APP COMPONENT
//* ---------------------

import BillResource from './resources'

let dashboardComponent = {
    template: `
    <div class="container">
        <div class="section">
            <div class="row">
                <div class="col s4">
                    <div class="card z-depth-2">
                        <div class="card-content ">
                            <a v-link="{name: 'bill.pay.list'}" class="grey-text text-darken-2">
                                <p class="card-title valign-wrapper">
                                    <i class="material-icons left">trending_down</i><span class="valign">DESPESAS</span>
                                </p>
                                <h4 class="right-align red-text">{{ despesas | currencyFormat }}</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col s4">
                    <div class="card z-depth-2">
                        <div class="card-content ">
                            <a v-link="{name: 'bill.receive.list'}" class="grey-text text-darken-2">
                                <p class="card-title valign-wrapper">
                                    <i class="material-icons left">trending_up</i><span class="valign">RECEITAS</span>
                                </p>
                                <h4 class="right-align blue-text">{{ receita | currencyFormat }}</h4>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col s4">
                    <div class="card z-depth-2">
                        <div class="card-content grey-text text-darken-2">
                            <p class="card-title valign-wrapper">
                                <i class="material-icons left">account_balance</i><span class="valign">TOTAL</span>
                            </p>
                            <h4 class="right-align" :class="{'grey-text': receita - despesas === 0, 'green-text': (receita - despesas) > 0, 'red-text': (receita - despesas) < 0}">
                                {{ receita - despesas| currencyFormat }}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            despesas: 0,
            receita: 0,
            total: 0
        }
    },
    created() {
        BillResource.pay.total().then((response) => {
            this.despesas = response.data.total
        })
        BillResource.receive.total().then((response) => {
            this.receita = response.data.total
        })
    }
}

export default dashboardComponent