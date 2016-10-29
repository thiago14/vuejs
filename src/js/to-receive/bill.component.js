let billToReceiveComponent = {
    template: `
        <div class="container">
            <div class="row valign-wrapper margin-none">
                <h4 class="col s10 valign">{{ title }}</h4>
                <a v-link="{name: 'bill.receive.create'}" class="btn col s2" v-if="this.$route.name === 'bill.receive.list'">Nova conta</a>
                <a v-link="{name: 'bill.receive.list'}" class="btn col s2" v-if="this.$route.name !== 'bill.receive.list'">Listagem</a>
            </div>
            <router-view></router-view>
            <br>
        </div>`,
    data() {
        return {
            title: 'Contas a receber'
        }
    }
}

export default billToReceiveComponent