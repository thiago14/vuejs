<template>
    <div class="container">
        <div class="row valign-wrapper margin-none">
            <h4 class="col s10 valign">{{ title }}</h4>
            <a v-link="{name: 'bill.pay.create'}" class="btn col s2" v-if="this.$route.name === 'bill.pay.list'">Nova conta</a>
            <a v-link="{name: 'bill.pay.list'}" class="btn col s2" v-if="this.$route.name !== 'bill.pay.list'">Listagem</a>
        </div>
        <router-view></router-view>
        <br>
    </div>
</template>
<script type="text/javascript">
    export default {
        data() {
            return {
                title: 'Contas a pagar'
            }
        }
    }
</script>