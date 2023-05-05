async function renderResults(){
    let xssCount = 0;
    let injCount = 0;
    let rceCount = 0;
    let jsonFilexss = await fetch('resultsxss.json', {
        headers:{
            "Access-Control-Allow-Origin" : "*"
        }
    });
    let jsonFilerce = await fetch('resultsrce.json', {
        headers:{
            "Access-Control-Allow-Origin" : "*"
        }
    });
    let jsonFileinj = await fetch('resultsinj.json', {
        headers:{
            "Access-Control-Allow-Origin" : "*"
        }
    });

    let jsonContentxss = await jsonFilexss.json();
    let jsonContentrce = await jsonFilerce.json();
    let jsonContentinj = await jsonFileinj.json();

    let table = document.getElementById('resultTable').getElementsByTagName('tbody')[0];

    jsonContentxss.concat(jsonContentrce).concat(jsonContentinj).forEach((result,i) => {
        let newRow = table.insertRow();

        var cell1 = newRow.insertCell(0);
        cell1.style = "font-weight: 700";
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        cell3.style = "overflow: hidden; text-overflow: ellipsis; width: 300px";
        var cell4 = newRow.insertCell(3);
        
        // Add some text to the new cells:
        cell1.innerHTML = i + 1;
        cell2.innerHTML = result.category;
        let evalResult = result.result !== undefined ? 'Failed' : 'Passed';
        if(result.result === 'Malicious Input'){
            cell4.style = "color: red";
            if(result.category === 'injection'){
                injCount++;
            }
            if(result.category === 'rce'){
                rceCount++;
            }
            if(result.category === 'xss'){
                xssCount++;
            }
        }else{
            cell4.style = "color: green";
        }
        cell4.appendChild(document.createTextNode(evalResult));
        cell3.appendChild(document.createTextNode(result.payload));
    });

    document.getElementById('xss').innerHTML = "Failed XSS : " + xssCount;
    document.getElementById('rce').innerHTML = "Failed RCE : " + rceCount;
    document.getElementById('inj').innerHTML = "Failed Injection : " + injCount;
}

renderResults();