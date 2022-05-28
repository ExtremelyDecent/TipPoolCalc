describe('payments test (with setup and tear-down)', function() {
    beforeEach(function () {
        // initialization logic
        billAmtInput.value = 10;
        tipAmtInput.value = 2;
    });
      
    it('should add a curPayment object to allPayments', function(){
        submitPaymentInfo();
        
        expect(allPayments['payment' + paymentId].billAmt).toEqual('10');
        expect(allPayments['payment' + paymentId].tipAmt).toEqual('2');
        expect(allPayments['payment' + paymentId].tipPercent).toEqual(20);
        expect(Object.keys(allPayments).length).toEqual(1);
    });

    it('should not add new payments with empty input with submitPaymentInfo ', function(){
        billAmtInput.value = '';
        tipAmtInput.value = '';
        submitPaymentInfo();
        expect(Object.keys(allPayments).length).toEqual(0);
    });

    it('should create a new payment when creatCurPayment is called', function(){
        let testPayment = {
            billAmt: '10',
            tipAmt: '2',
            tipPercent: 20,
        };

        expect(createCurPayment()).toEqual(testPayment);
    });
    
    it('should payment update #paymentTable on appendPaymentTable()', function () {
        let curPayment = createCurPayment();
        allPayments['payment1'] = curPayment;

        appendPaymentTable(curPayment);

        let curTdList = document.querySelectorAll('#paymentTable tbody tr td');

        expect(curTdList.length).toEqual(4);
        expect(curTdList[0].innerText).toEqual('$10');
        expect(curTdList[1].innerText).toEqual('$2');
        expect(curTdList[2].innerText).toEqual('20%');
        expect(curTdList[3].innerText).toEqual('X');
    });

    
    it('should not create a new payment when createCurPayment is called with empty input', function(){
        billAmtInput.value = '';
        tipAmtInput.value = '';
        let testPayment = createCurPayment();

        expect(testPayment).toEqual(undefined);
    });
    afterEach(function() {
        // teardown logic
        billAmtInput.value = '';
        tipAmtInput.value = '';
        paymentTbody.innerHTML = '';
        summaryTds[0].innerHTML = '';
        summaryTds[1].innerHTML = '';
        summaryTds[2].innerHTML = '';
        serverTbody.innerHTML = '';
        paymentId = 0;
        allPayments = {};
    });
});