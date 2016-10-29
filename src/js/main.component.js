//* ---------------------
//*   Vue APP COMPONENT
//* ---------------------
let mainComponent = {
    template: `
        <ul id="{{menu.subMenuId}}" class="dropdown-content" v-for="menu in menus">
            <li v-for="sub in menu.subMenus">
                <a v-link="{name: sub.routeName}" >{{ sub.name }}</a>
            </li>
        </ul>
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper blue lighten-2">
                    <div class="row">
                        <div class="col s12">
                            <a href="#!" class="brand-logo right">TMO</a>
                            <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                            <ul id="nav-mobile" class="hide-on-med-and-down left">
                                <li v-for="m in menus">
                                    <a v-link="#!" v-if="m.subMenuId" class="dropdown-button" data-activates="{{m.subMenuId}}">
                                        {{ m.name }} <i class="material-icons right">arrow_drop_down</i>
                                    </a>
                                    <a v-link="{name: m.routeName}" v-if="!m.subMenuId" >
                                        {{ m.name }}
                                    </a>
                                </li>
                            </ul>
                            <ul class="side-nav collapsible" data-collapsible="accordion" id="mobile-demo">
                                <li v-for="m in menus">
                                    <div class="collapsible-header">
                                        <a v-link="{name: m.routeName}" v-if="!m.subMenuId">
                                            {{ m.name }}
                                        </a>
                                        <a v-if="m.subMenuId">
                                            {{ m.name }}
                                        </a>
                                    </div>
                                    <div class="collapsible-body">
                                        <ul class="collapsible" data-collapsible="accordion" v-if="m.subMenuId">
                                            <li v-for="sub in m.subMenus">
                                                <a v-link="{name: sub.routeName}" >{{ sub.name }}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <router-view></router-view>
    `,
    data() {
        return {
            menus: [
                { id: 0, name: 'Dashboard', routeName: 'dashboard'},
                { id: 1, name: 'Contas a pagar', routeName: 'bill.pay', subMenuId: 'bill_pay', subMenus: [
                    { id: 0, name: 'Lista de contas', routeName: 'bill.pay'},
                    { id: 1, name: 'Criar conta', routeName: 'bill.pay.create'}
                ]},
                { id: 2, name: 'Conta a receber', routeName: 'bill.receive', subMenuId: 'bill_receive', subMenus: [
                    { id: 0, name: 'Lista de contas', routeName: 'bill.receive'},
                    { id: 1, name: 'Criar conta', routeName: 'bill.receive.create'}
                ]}
            ]
        }
    },
    created(){
        $(document).ready(() => {
            $(".button-collapse").sideNav()
            $(".dropdown-button").dropdown()
            $('.collapsible').collapsible()
        })
    }
}

export default mainComponent