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

//Alterar a cor do card total de acordo com o montante final :
// Negativo - vermelho
// Positivo - verde 
const DisplayTotal = {
    plus(){
        document
            .querySelector('.card.total')
            .classList.add('plus')
    },
    minus(){
         document
         .querySelector('.card.total')
         .classList.add('minus')
    }
 }

const Transaction = {
    all: [
        {
            description: 'Luz', 
            amount: -48729, 
            date: '23/01/2021',
        }, 
        {
            description: 'Frelancer', 
            amount: 500000, 
            date: '21/01/2021',
        },
        {
            description: 'Internet', 
            amount: -12000,
            date: '20/01/2021',
        }],
    //Adicionar transação à tabela
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

    //Remover transação da tabela
    remove(index){
        Transaction.all.splice(index,1)

        App.reload()
    },

    //Calcular valores dos Cards
    incomes(){ //somar entradas
        let income = 0;
        
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income += transaction.amount;
            }
        })

        return income
    },
    expenses(){ //somar saídas
        let expense = 0;
        
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
            }
        })
        
        return expense
    },
    total(){
        let total = 0;

        total = Transaction.incomes() + Transaction.expenses();


        return total
    }
}


//Formatar moeda para o padrão R$ (real)
const Utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "- " : "+ "

        //transformando montante em um string
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal+value
    },

    formatAmount(value){
        console.log(value)
    }
}


//Transferir dados das transações para o HTML
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHtmltransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHtmltransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

         //Chamando formatação
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="/assets/minus.svg" alt="Remover transação"></td>
            `
        return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
        
        if(Transaction.total() > 0) {
            DisplayTotal.plus();
        } else if (Transaction.total() < 0){
            DisplayTotal.minus();
        }
    },
    clearTransaction(){
            DOM.transactionsContainer.innerHTML = ""
    }
}

const App = {
    init() { 
        //Criando a tabela inicial
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })

        DOM.updateBalance()

    },
    reload(){
        DOM.clearTransaction()
        App.init()
    }
    
}

App.init()




