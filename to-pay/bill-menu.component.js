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
