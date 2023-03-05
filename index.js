// Your code here
//Function to create an employee record object
function createEmployeeRecord(emp){
    const record = {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return record;
}

//Function to create employee records from array of arrays
function createEmployeeRecords(empArr){
    let arr = [];
    for(let i in empArr){
        arr.push(createEmployeeRecord(empArr[i]));
    }
    return arr;
}

//Function to add a time in event to employee record
function createTimeInEvent(record, date){
    let [dateHr, hour] = date.split(" ");
    let event = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: dateHr
    };
    record.timeInEvents.push(event);
    return record;
}

//Function to add a time out event to employee record
function createTimeOutEvent(record, date){
    let [dateHr, hour] = date.split(" ");
    let event = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: dateHr
    };
    record.timeOutEvents.push(event);
    return record;
}

//Function to calculate hours worked on a particular date
function hoursWorkedOnDate(record, date){
    let inT, outT;
    for(let i in record.timeInEvents){
        if(record.timeInEvents[i].date === date){
            inT = record.timeInEvents[i].hour;
            break;
        }
    }
    for(let j in record.timeOutEvents){
        if(record.timeOutEvents[j].date === date){
            outT = record.timeOutEvents[j].hour;
            break;
        }
    }
    return (outT - inT)/100;
}

//Function to calculate wages for a particular date
function wagesEarnedOnDate(record, date){
    let hrsWrkd = hoursWorkedOnDate(record, date);
    return hrsWrkd * record.payPerHour;
}

//Function to calculate total wages for an employee
function allWagesFor(record){
    let dates = record.timeInEvents.map(function(e) { return e.date; });
    let payable = dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d);
    }, 0);
    return payable;
}

//Function to calculate total payroll for all employees
function calculatePayroll(arr){
    let payroll = arr.reduce(function(memo, rec){
        return memo + allWagesFor(rec);
    }, 0);
    return payroll;
}
