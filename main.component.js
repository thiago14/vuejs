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
                            <a v-link="{ name: m.routeName, activeClass: 'blue' }">{{ m.name }}</a>
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
            ]
        };
    }
});
