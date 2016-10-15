//* ---------------------
//*   Vue MENU COMPONENT
//* ---------------------
window.billMenuComponent = Vue.extend({
    template: `
        <nav class="blue lighten-2">
            <div class="nav-wrapper">
                <ul id="nav-mobile" class="left">
                    <li v-for="m in menus">
                        <a v-link="{name: m.routeName, activeClass: 'blue', exact: true}" >{{ m.name }}</a>
                    </li>
                </ul>
            </div>
        </nav>
        <br>
        <router-view></router-view>
    `,
    data: function () {
        return {
            menus: [
                { id: 0, name: 'Lista de contas', routeName: this.$route.matched[0].handler.name},
                { id: 1, name: 'Criar conta', routeName: this.$route.matched[0].handler.name + '.create'}
            ],
        }
    }
});
