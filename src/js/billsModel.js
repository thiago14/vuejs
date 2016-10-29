class BillsModel {
    constructor(BillApi) {
        this._BillApi = BillApi
        this.bills = []
        this.bill = {}
        this.resetBill()
    }

    delete(bill) {
        this._BillApi.delete({id: bill.id})
            .then(() => {
                this.bills.$remove(bill)
                Materialize.toast('Conta deletada com sucesso!', 4000, 'green')
            })
            .catch(() => {
                Materialize.toast('Ocorreu um erro ao deletar!', 4000, 'red')
            })
    }

    find(id) {
        this._BillApi.get({id: id}).then((response) => {
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
        return this._BillApi.save({}, this.bill).then(() => {
            Materialize.toast('Conta salva com sucesso!', 4000, 'green')
        })
        .catch(() => {
            Materialize.toast('Ocorreu um erro ao salvar!', 4000, 'red')
        })
    }

    update(bill = this.bill) {
        return this._BillApi.update({id: bill.id}, bill).then(() => {
            Materialize.toast('Conta atualizada com sucesso!', 4000, 'green')
        })
        .catch(() => {
            Materialize.toast('Ocorreu um erro ao atualizar!', 4000, 'red')
        })
    }
}

export default BillsModel