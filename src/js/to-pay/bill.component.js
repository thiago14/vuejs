window.billToPayComponent = Vue.extend({
    components: {
        'menu-component': billMenuComponent
    },
    template: `
        <div class="container">
            <h1>{{ title }}</h1>
            <menu-component></menu-component>
            <br>
        </div>`,
    data: function () {
        return {
            title: 'Contas a pagar'
        };
    }
});
