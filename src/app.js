let router = new VueRouter();

router.map({
    '/bill-to-pay': {
        component: billToPayComponent,
        name: 'bill.pay',
        subRoutes: {
            '/': {
                name: 'bill.pay.list',
                component: billListComponent
            },
            '/create': {
                name: 'bill.pay.create',
                component: billCreateComponent
            },
            '/:id/update': {
                name: 'bill.pay.update',
                component: billCreateComponent
            }
        }
    },
    '/bill-to-receive': {
        component: billToReceiveComponent,
        name: 'bill.receive',
        subRoutes: {
            '/': {
                name: 'bill.receive.list',
                component: billReceiveListComponent
            },
            '/create': {
                name: 'bill.receive.create',
                component: billReceiveCreateComponent
            },
            '/:id/update': {
                name: 'bill.receive.update',
                component: billReceiveCreateComponent
            }
        }
    },
    '/dashboard': {
        name: 'dashboard',
        component: dashboardComponent
    },
    '*': {
        component: dashboardComponent
    }
});

router.start({
    components: {
        'main-component': mainComponent
    }
}, '#app');

router.redirect({
   "*": '/dashboard'
});