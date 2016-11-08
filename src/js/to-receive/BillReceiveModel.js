import BillsModel from '../billsModel'
import BillResource from '../resources'

class BillReceiveModel extends BillsModel
{
    constructor()
    {
        super(BillResource.receive)
    }
}

export default BillReceiveModel