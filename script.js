function setLanguageTo(lang) {
    let stillOutstandingAmount = document.getElementById("stillOutstandingAmount");

    if (lang === "en-IN") {
        document.querySelector("html").lang = "en-IN";

        document.getElementById("header").title = "User-editable (click between the brackets to edit)";
        document.getElementById("header").innerHTML = `Milk Account (<span id = "headerDesc" contenteditable>${document.getElementById("headerDesc").innerText}</span>)`;

        document.getElementById("th1").innerText = "Quantity (in Litres)";
        document.getElementById("th2").innerText = "No. of Days";
        document.getElementById("th3").innerText = "Total";
        document.getElementById("thTotal").innerText = "Total Milk:";

        document.getElementById("askRate").innerText = "Milk Rate:";
        document.getElementById("milkRateUnit").innerText = " per Litre";
        document.getElementById("askOutstanding").innerText = "Outstanding Amount:";

        document.getElementById("tellGross").innerText = "Gross Amount:";
        document.getElementById("tellNet").innerText = "Net Payable:";

        if (stillOutstandingAmount.innerText != "") {
            stillOutstandingAmount.innerText = `₹${-netPayable} will stand as outstanding amount after the transaction takes place.`;
        }

        document.getElementById("setLang").innerHTML = `
            Language:
            <button class = "inactiveButton" style = "margin-left: 20px;" onclick = "setLanguageTo('en-IN')"> English (India) </button>
            <button onclick = "setLanguageTo('hi')"> Hindi </button>`;
    } else if (lang === "hi") {
        document.querySelector("html").lang = "hi";

        document.getElementById("header").title = "उपयोगकर्ता–संपादन योग्य (संपादित करने के लिए कोष्ठक के बीच क्लिक करें)";
        document.getElementById("header").innerHTML = `दूध का हिसाब (<span id = "headerDesc" contenteditable>${document.getElementById("headerDesc").innerText}</span>)`;

        document.getElementById("th1").innerText = "मात्रा (लीटरों में)";
        document.getElementById("th2").innerText = "दिन";
        document.getElementById("th3").innerText = "योग";
        document.getElementById("thTotal").innerText = "कुल दूध:";

        document.getElementById("askRate").innerText = "दूध की दर:";
        document.getElementById("milkRateUnit").innerText = " प्रति लीटर";
        document.getElementById("askOutstanding").innerText = "बकाया राशि:";

        document.getElementById("tellGross").innerText = "सकल राशि:";
        document.getElementById("tellNet").innerText = "देय राशि:";

        if (stillOutstandingAmount.innerText != "") {
            stillOutstandingAmount.innerText = `लेनदेन होने के बाद ₹${-netPayable} बकाया राशि के रूप में बचेंगे।`;
        }

        document.getElementById("setLang").innerHTML = `
            भाषा:
            <button style = "margin-top: 20px; margin-left: 20px;" onclick = "setLanguageTo('en-IN')"> अंग्रेज़ी (भारत) </button>
            <button class = "inactiveButton" onclick = "setLanguageTo('hi')"> हिंदी </button>`;
    }
}

function updateValues(recursion) {
    document.getElementById("totalMilk").value = "0";
    document.getElementById("readMilkRate").value = "0";
    document.getElementById("grossAmount").value = "0";
    document.getElementById("readGrossAmount").value = "0";
    document.getElementById("readOutstandingAmount").value = "0";
    document.getElementById("netPayable").value = "0";
    let totalMilk = 0;
    for (let i = 1; i <= noOfRows; i++) {
        if (!recursion) calcCategory(String(i), true);
        totalMilk += Number(document.getElementById(`totalInRow${i}`).value);
    }
    document.getElementById("totalMilk").value = totalMilk;
    document.getElementById("readTotalMilk").value = totalMilk;
    const milkRateHolder = document.getElementById("milkRate");
    const outstandingAmountHolder = document.getElementById("outstandingAmount");
    milkRateHolder.className = "";
    outstandingAmountHolder.className = "";
    if (!(Number(milkRateHolder.value) && Number(outstandingAmountHolder.value))) {
        if (Number(milkRateHolder.value)) {
            document.getElementById("readMilkRate").value = milkRateHolder.value;
        } else if (milkRateHolder.value !== "0") milkRateHolder.className = "faultyInput";
        if (Number(outstandingAmountHolder.value)) {
            document.getElementById("readOutstandingAmount").value = outstandingAmountHolder.value;
        } else if (outstandingAmountHolder.value !== "0") outstandingAmountHolder.className = "faultyInput";
    } else {
        document.getElementById("readMilkRate").value = milkRateHolder.value;
        document.getElementById("readOutstandingAmount").value = outstandingAmountHolder.value;
    }
    const grossAmount = milkRateHolder.value * totalMilk;
    netPayable = grossAmount - outstandingAmountHolder.value;

    document.getElementById("grossAmount").value = grossAmount;
    document.getElementById("readGrossAmount").value = grossAmount;


    document.getElementById("stillOutstandingAmount").innerText = "";
    if (netPayable < 0) {
        if (document.querySelector("html").lang === "en-IN") {
            document.getElementById("stillOutstandingAmount").innerText = `₹${-netPayable} will stand as outstanding amount after the transaction takes place.`;
        } else if (document.querySelector("html").lang === "hi") {
            document.getElementById("stillOutstandingAmount").innerText = `लेनदेन होने के बाद ₹${-netPayable} बकाया राशि के रूप में बचेंगे।`;
        }
        document.getElementById("netPayable").value = "0";
    } else {
        document.getElementById("netPayable").value = netPayable;
    }
}
function calcCategory(id, recursion) {
    const rowNumber = parseInt(id.slice(-1));
    document.getElementById(`totalInRow${rowNumber}`).value = "0";
    const milkAmountHolder = document.getElementById(`milkAmount${rowNumber}`);
    const noOfDaysHolder = document.getElementById(`noOfDays${rowNumber}`);
    milkAmountHolder.className = "";
    noOfDaysHolder.className = "";
    if (!(Number(milkAmountHolder.value) && parseInt(noOfDaysHolder.value))) {
        if (!Number(milkAmountHolder.value) && milkAmountHolder.value !== "0") milkAmountHolder.className = "faultyInput";
        if (!parseInt(noOfDaysHolder.value) && noOfDaysHolder.value !== "0") noOfDaysHolder.className = "faultyInput";
    } else {
        document.getElementById(`totalInRow${rowNumber}`).value = milkAmountHolder.value * noOfDaysHolder.value;
    }
    if (!recursion) updateValues(true);
}

function addRowToTable() {
    noOfRows += 1;
    const row = document.createElement("tr");
    row.id = `rowNo${noOfRows}`;
    row.innerHTML = `
        <td> <input id = "milkAmount${noOfRows}" type = "number" value = "0" oninput = "calcCategory(id)" /> </td>
        <td> <input id = "noOfDays${noOfRows}" type = "number" value = "0"  oninput = "calcCategory(id)" /> </td>
        <td> <input id = "totalInRow${noOfRows}" value = "0" readonly /> </td>`;
    document.getElementById("milkRecordTable").appendChild(row);
    if (noOfRows === 2) {
        document.getElementById("removeRowButton").removeAttribute("class");
    }
}
function removeRowFromTable() {
    if (noOfRows > 1) {
        document.getElementById(`rowNo${noOfRows}`).remove();
        noOfRows -= 1;
        if (noOfRows === 1) {
            document.getElementById("removeRowButton").setAttribute("class", "inactiveButton");
        }
    }
}

function saveMilkRate() {
    const milkRateHolder = document.getElementById("milkRate");
    if (!milkRateHolder.classList.contains("faultyInput")) {
        try {
            localStorage.setItem("milkRate", milkRateHolder.value);
        } catch (error) {
            console.error("Could not save milk rate to local storage:", error);
        }
    }
}
function readMilkRate() {
    try {
        const stored = localStorage.getItem("milkRate");
        if (stored) {
            document.getElementById("milkRate").value = stored;
        }
    } catch (error) {
        console.error("Could not retrieve milk rate from local storage:", error);
    }
}

function storageMessageReceived() {
    document.getElementById("storageMessage").style.display = "";
    localStorage.setItem("storageMessageMilkPrice", "true");
}

let noOfRows = netPayable = 0;
try {
    const stored = localStorage.getItem("storageMessageMilkPrice");
    if (stored) {
        if (stored !== "true") {
            document.getElementById("storageMessage").style.display = "block";
        }
    } else {
        localStorage.setItem("storageMessageMilkPrice", "false");
        document.getElementById("storageMessage").style.display = "block";
    }
} catch (error) {
    console.error("Could not retrieve milk rate from local storage:", error);
}
readMilkRate();
setLanguageTo("en-IN");
updateValues();
addRowToTable();
