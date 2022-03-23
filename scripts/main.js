const Modal = {
    open(){
        document
            .querySelector('.modal-overlay')
            .classList.add('active')        
    },
    close(){
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }
}


const transactions = [{
        id: 1, 
        description: 'Luz', 
        amount: -50000, 
        date: '23/01/2021'
    }, 
    {
        id: 2, 
        description: 'Frelancer', 
        amount: 5000000, 
        date: '21/01/2021'
    },
    {
        id: 3, 
        description: 'Internet', 
        amount: -20000,
        date: '20/01/2021'
    }]


const Transaction = {
    incomes(){ //somar entradas

    },
    expenses(){ //somar saídas

    },
    total(){

    }
}

//Transferir dados das transações para o HTML
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHtmltransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
        console.log(tr)
    },

    innerHtmltransaction(){
        const html = `
            <td class="description">${transactions.description}</td>
            <td class="expense">${transactions.amount}</td>
            <td class="date">${transactions.date}</td>
            <td><img src="/assets/minus.svg" alt="Remover transação"></td>`

        return html
    }
}


DOM.addTransaction(transactions[0])
DOM.addTransaction(transactions[1])
DOM.addTransaction(transactions[2])