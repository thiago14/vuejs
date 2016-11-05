import BillsModel from '../billsModel'
import BillResource from '../resources'

class BillPayModel extends BillsModel
{
    constructor()
    {
        super(BillResource.pay)
    }
}

export default BillPayModel