class BillsModel {
    constructor(BillApi) {
        this._BillApi = BillApi
        this.bills = []
        this.bill = {}
        this.count = 0
        this.status = ''
        this.total = 0
        this.resetBill()
    }

    delete(bill) {
        this._BillApi.delete({id: bill.id})
            .then(() => {
                this.bills.$remove(bill)
                this.total -= bill.value
                this.statusBill()
                Materialize.toast('Conta deletada com sucesso!', 4000, 'green')
            })
            .catch(() => {
                Materialize.toast('Ocorreu um erro ao deletar!', 4000, 'red')
            })
    }

    find(id) {
        this._BillApi.get({id: id})
            .then((response) => {
                this.bill = response.data
            })
            .catch(() => {
                Materialize.toast('Ocorreu um erro ao carregar o id!', 4000, 'red')
            })
    }

    list() {
        this._BillApi.query()
            .then(response => {
                this.bills = response.data
                this.statusBill()
            })
            .catch(() => {
                Materialize.toast('Ocorreu um erro ao listar!', 4000, 'red')
            })
    }

    resetBill() {
        this.bill = {
            date_due: '',
            done: false,
            id: null,
            name: '',
            value: null
        }
    }

    save() {
        return this._BillApi.save({}, this.bill)
            .then(() => {
                this.statusBill()
                Materialize.toast('Conta salva com sucesso!', 4000, 'green')
            })
            .catch(() => {
                Materialize.toast('Ocorreu um erro ao salvar!', 4000, 'red')
            })
    }

    statusBill() {
        this.count = null

        if(this.bills.length == 0) {
            this.count = this.bills.length
            this.status = 'Sem registros'
        }else {
            for(let i in this.bills) {
                if(!this.bills[i].done) {
                    this.count++
                }
            }

            if(!this.count) {
                this.status = 'Nenhuma conta'
            }
            else if(this.count == 1) {
                this.status = 'Há 1 conta'
            }
            else {
                this.status = 'Há ' + this.count + ' contas'
            }
        }
    }

    totalBill() {
        return this._BillApi.total()
            .then(response => {
                this.total = response.data.total
            })
    }

    update(bill = this.bill) {
        return this._BillApi.update({id: bill.id}, bill)
            .then(() => {
                this.statusBill()
                Materialize.toast('Conta atualizada com sucesso!', 4000, 'green')
            })
            .catch(() => {
                Materialize.toast('Ocorreu um erro ao atualizar!', 4000, 'red')
            })
    }
}

export default BillsModel