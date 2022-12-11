

class Customer{
    constructor(customer_id,transcation_amount,mobile_no,transcation_datetime,pincode){
        this.customer_id=customer_id;
        this.transcation_amount=transcation_amount;
        this.mobile_no=mobile_no;
        this.transcation_datetime=transcation_datetime;
        this.pincode=pincode
    }
}
module.exports=Customer;