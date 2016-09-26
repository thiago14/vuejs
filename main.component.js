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
                {id:0, date_due: '12/12/1221', name: 'Conta de luz', value: 21.3, done: false},
                {id:1, date_due: '22/12/1221', name: 'Supermercado', value: 213.55, done: false},
                {id:1, date_due: '22/10/1221', name: 'Cartão', value: 56.55, done: false}
            ],
            billsToReceive: []
        };
    }
});
