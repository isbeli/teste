
function calcSoma(){
    let response = document.getElementById("response");
    let indice = 13;
    let soma = 0;
    let k = 0;
    
    while(k < indice){
        k++;
        soma = soma + k;
    }
    response.value = soma;
}


function calcFibonacci(){
    let number         = parseInt(document.getElementById("numberFibonacci").value);
    let text           = document.getElementById("responseFibonacci")
    let serieFibonacci = [];
    let exist          = false;

    if (number > 0){
        serieFibonacci = number >= 2 ? fibonacci(number) : [0] ; 
        exist = serieFibonacci.includes(number);

        text.innerText = " O numero "+ number + (exist ? "" : " nao ") +" pertenece a sequencia (" + serieFibonacci.join() + ")"
        document.getElementById("numberFibonacci").value = '';
    }else{
        alert('Insira um numero maior que zero')
        document.getElementById("numberFibonacci").value = '';
    }
} 

function fibonacci(number){
    let serie = [0,1];

    if(number > 2){
        for (let i = 2; i < number; i++) {
            serie[i] = serie[i-1] + serie[i-2]; 
        }
    }

    return serie;
}

function calcSales(){

    
    fetch('dados.json')
    .then((response) => response.json())
    .then((json) => {

        let sales = json;
        let lesserSale = sales[0];
        let higherSale = sales[0];

        const filterSales = sales.filter(sale => sale.valor > 0);
        const media = (filterSales.reduce((accumulator,sale) => accumulator + sale.valor,0)) / filterSales.length
        const days = filterSales.filter(sale => sale.valor > media).length;

        sales.forEach(sale => {
            lesserSale = (sale.valor > 0) && sale.valor < lesserSale.valor ? sale : lesserSale;
            higherSale = sale.valor > higherSale.valor ? sale : higherSale;
        })

        document.getElementById("listReturn").innerHTML = 
        '<li>Menor valor de faturamento ocorrido em um dia do mês: '+lesserSale.valor+'</li>'+
        '<li>Maior valor de faturamento ocorrido em um dia do mês: '+higherSale.valor+'</li>'+
        '<li>Número de dias no mês em que o valor de faturamento diário foi superior à média mensal: '+days+'</li>'
    })
    .catch(function(error) {
        document.getElementById("listReturn").innerHTML = '<li>Erro a obter os dados</li>'
    });

    

}

function calcBilling(){
    let billings = [
        {estado  : 'SP', valor : 'R$67.836,43'},
        {estado  : 'RJ', valor : 'R$36.678,66'},
        {estado  : 'MG', valor : 'R$29.229,88'},
        {estado  : 'ES', valor : 'R$27.165,48'},
        {estado  : 'Outros', valor : 'R$19.849,53'}
    ]

    let total = billings.reduce((accumulator,element) => accumulator + parseValueRs(element.valor) ,0)
    console.log(total)
    billings.forEach(element => {
        element['percentual'] = (100 * parseValueRs(element.valor)) / total
    });

    document.getElementById('tableContainer').innerHTML = createTable(billings);
    //console.log( billings)

}

function parseValueRs(text){
   return  parseFloat((text.replace(/[^0-9,]/g, '')).replace(',','.'),2)
}

function createTable(obj){
    let html = '<table>'
    let head = '';
    let body = '<tbody>';
    let rowsTable = '';

    obj.forEach(element => {
        if(head == ''){
            head+='<thead>'
            head+='<tr>'
            let cols = Object.keys(element);
            cols.forEach(col => {
                console.log(col)
                head+='<th>'+col+'</th>'
            });

            head+='</tr>'
            head+='</thead>'     
        }
        
            let row = Object.values(element);
            console.log( row)

            rowsTable+='<tr>'
            row.forEach(col => {
                //console.log(col)
                rowsTable+='<td>'+col+'</td>'
            });
            rowsTable+='</tr>'
        
        
        
    });
    
    return html+=head+'<tbody>'+rowsTable+'</tbody></table>'
}

function revert(){
    let array      = []
    let str        = document.getElementById("revert").value
    let textRevert = '';

    for (let i = str.length-1; i >= 0 ; i--) {
        array[array.length] = str.charAt(i);
    }

    array.forEach(character => {
        textRevert+= character; 
    });

    document.getElementById("resulRevert").value= textRevert ;
}