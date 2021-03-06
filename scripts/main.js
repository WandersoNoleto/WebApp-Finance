
//Não concluído - verificar Aula 03 => 02:54:10
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

//Armazenar dados no localStorage
const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) 
        || []
    },
    set(transactions){
        localStorage.setItem("dev.finances:transactions",
        JSON.stringify(transactions))
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
        document
            .querySelector('.card.total')
            .classList.remove('minus')
    },
    minus(){
         document
            .querySelector('.card.total')
            .classList.add('minus')
        document
            .querySelector('.card.total')
            .classList.remove('plus')
    },
    normal(){
        document
            .querySelector('.card.total')
            .classList.remove('plus') || document
            .querySelector('.card.total').classList.remove('minus')
    }
 }

const Transaction = {
    all: Storage.get(),

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
                document.getElementById('incomeDisplay').classList.add('income')
            }
        })

        return income
    },
    expenses(){ //somar saídas
        let expense = 0;
        
        Transaction.all.forEach(transaction => {
            if(transaction.amount < 0){
                expense += transaction.amount;
                document.getElementById('expenseDisplay').classList.add('expense')
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


//Formatar moeda para o padrão R$ (real),
//Valor recebido no formulário para numero,
//Data para o padrão dia/mes/ano
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
        value = Number(value.replace(/\,\./g, "")) * 100
        //value = Number(value) * 100 - alternativa
        
        return value
    },

    formatDate(date){
        const splittedDate = date.split("-")
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}


//Transferir dados das transações para o HTML
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHtmltransaction(transaction, index)
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHtmltransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

         //Chamando formatação
        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><span id="lineRemove" onclick="Transaction.remove(${index})">x</span></td>
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
        } if (Transaction.total() < 0){
            DisplayTotal.minus();
        } else if(Transaction.total() == 0){
            DisplayTotal.normal();
        }
    },
    clearTransaction(){
            DOM.transactionsContainer.innerHTML = ""
    }
}

const App = {
    init() { 
        //Criando a tabela inicial
        Transaction.all.forEach(DOM.addTransaction)

        DOM.updateBalance()

    },
    reload(){
        DOM.clearTransaction()
        App.init()
    }
    
}


App.init()





