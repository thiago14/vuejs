//* ---------------------
//*   Vue APP COMPONENT
//* ---------------------
window.mainComponent = Vue.extend({
    template: `
        <div class="row">
            <nav class="blue lighten-2">
                <div class="nav-wrapper">
                    <ul id="nav-mobile" class="left">
                        <li v-for="m in menus">
                            <a v-link="{ name: m.routeName }">{{ m.name }}</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <router-view></router-view>
    `,
    data: function () {
        return {
            menus: [
                { id: 0, name: 'Dashboard', routeName: 'dashboard'},
                { id: 1, name: 'Contas a pagar', routeName: 'bill.pay'},
                { id: 2, name: 'Conta a receber', routeName: 'bill.receive'}
            ],
            billsToPay: [
                {id:0, date_due: '12/12/2016', name: 'Conta de luz', value: 21.30, done: false},
                {id:1, date_due: '22/11/2016', name: 'Supermercado', value: 213.55, done: false},
                {id:1, date_due: '22/10/2016', name: 'Cartão', value: 56.55, done: false}
            ],
            billsToReceive: [
                {id:0, date_due: '12/12/2016', name: 'Salário', value: 2510.30, done: false},
                {id:1, date_due: '22/11/2016', name: 'Rendimentos', value: 215.55, done: false},
                {id:1, date_due: '22/10/2016', name: 'Juros', value: 5.55, done: false}
            ]
        };
    }
});
