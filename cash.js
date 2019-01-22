var regStatus = {closed: "CLOSED", open: "OPEN", insufficient_Funds: "INSUFFICIENT_FUNDS"}

function checkCashRegister(price, cash, changeInDrawer) {
    let hello = {status: '', change: changeInDrawer};
    let changeWeNeed = parseFloat(cash - price).toFixed(2);
    let changeAvailToUsInReg = changeAvailableToUs(changeInDrawer);
    hello.status = getStatusReg(changeWeNeed, changeAvailToUsInReg); 
    
    if (hello.status === regStatus.insufficient_Funds) {
        hello.change = [];

        return hello;
    }

    hello.change = returnChangeToCustomer(changeWeNeed, changeInDrawer);

    if (changeWeNeed > changeAvailableToUs(hello.change)) {
        hello.status = regStatus.insufficient_Funds;
        hello.change = [];
    }

    if (hello.status === regStatus.closed) {
        hello.change = [...changeInDrawer];
    }

    return hello;
}

function changeAvailableToUs(changeInDrawer) {
    let total = 0;
    for (let money of changeInDrawer) {
        let moneyAmount = money[1];
        total += moneyAmount
    }
    return total.toFixed(2);
}

function getStatusReg(changeWeNeed, changeAvailToUsInReg) {
    if (Number(changeWeNeed) > Number(changeAvailToUsInReg)) {
        return regStatus.insufficient_Funds;
    }

    if (changeWeNeed < Number(changeAvailToUsInReg)) {
        return regStatus.open;
    }
    
    return regStatus.closed;
}

function returnChangeToCustomer(changeWeNeed, changeInDrawer) {
    const change = [];
    const currencyDictionary = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.10,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "HUNDRED": 100.00
    };

    for (let x = changeInDrawer.length - 1; x >= 0; x--) {
        let moneyName = changeInDrawer[x][0];
        let moneyTotal = changeInDrawer[x][1];
        let moneyValue = currencyDictionary[moneyName];
        let howManyMoney = (moneyTotal / moneyValue).toFixed(2);

        let moneyToReturn = 0;

        while (changeWeNeed >= moneyValue && howManyMoney > 0) {
            changeWeNeed -= moneyValue;
            changeWeNeed = changeWeNeed.toFixed(2);
            howManyMoney--;
            moneyToReturn++;
        }

        if (moneyToReturn > 0) {
            change.push([moneyName, moneyValue * moneyToReturn]);
        } 

    }
    return change; 
}