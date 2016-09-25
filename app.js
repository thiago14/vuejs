//* ---------------------
//*   Vue APP COMPONENT
//* ---------------------
Vue.component('app-component', {
    components: {
        'bill-create-component': billCreateComponent,
        'bill-list-component': billListComponent,
        'menu-component': menuComponent
    },
    template: `
        <div class="container">
            <h1>{{ title }}</h1>
            <menu-component></menu-component>
            <br>
            <div class="row" v-show="activedView === 0">
                <bill-list-component></bill-list-component>
            </div>
            <div class="row" v-show="activedView === 1">
                <bill-create-component :bill.sync="bill"></bill-create-component>
            </div>
        </div>`,
    data: function () {
        return {
            title: 'Contas a receber',
            activedView: 0
        };
    },
    events: {
        'change-activeView': function (activeView) {
            this.activedView = activeView;
        },
        'change-formType': function (formType) {
            this.$broadcast('change-formType', formType);
        },
        'change-bill': function (bill) {
            this.$broadcast('change-bill', bill);
        },
        'new-bill': function (bill) {
            this.$broadcast('new-bill', bill);
        }
    }
});

//* ---------------------
//*   Vue INIT APP
//* ---------------------
var app = new Vue({
    el: "#app"
});