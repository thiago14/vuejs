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
            })
    }

    find(id) {
        this._BillApi.get({id: id}).then((response) => {
            this.bill = response.data
        })
    }

    list() {
        this._BillApi.query()
            .then(response => {
                this.bills = response.data
            })
    }

    resetBill() {
        this.bill = {
            date_due: '',
            name: '',
            value: null,
            done: false
        }
    }

    save() {
        return this._BillApi.save({}, this.bill)
    }

    update(bill = this.bill) {
        return this._BillApi.update({id: bill.id}, bill)
    }
}