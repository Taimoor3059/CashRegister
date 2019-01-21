function checkCashRegister(price, cash, cid) {
    let cashRegister = {status: '', change: cid};
    let changeNeeded = parseFloat(cash - price).toFixed(2);
    let changeAvailable = getTotalCashRegisterChange(changeInDrawer); 
    cashRegister.status = getTotalCashRegisterStatus(changeNeeded, changeAvailable);
    console.log(changeAvailable);
}

function getTotalCashRegisterChange(changeInDrawer) {
    let total = 0;
    
    for (let change of changeInDrawer) {
        let changeValue = change[1];
        total += changeValue;
    }
    return total.toFixed(2);
}

function getTotalCashRegisterStatus(changeNeeded, changeAvailable) {
    
}















checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);