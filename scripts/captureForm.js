const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    //Criando função para recolher valores
    getValues(){
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },
   
    //Validar informações dos campos do modal
    validateField(){
        const { description, amount, date} = Form.getValues() // coletando dados do Modal
        
        //Verificando se todos os dados estão preenchidos
        if(description.trim() === "" || amount.trim() === "" || 
        date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        }
    },

    //Formatar dados inseridos
    formatValues(){
        let { description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        return{
            description,
            amount,
            date
        }
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },


    submit(event){
        event.preventDefault() //retirar comportamento padrão de submit para aplicar os procedimentos desejados 
     
        try {
            Form.validateField()

            //receber a nova transação e formatar os valores recebidos
            const transaction = Form.formatValues()
            Transaction.add(transaction)

            //Limpar dados dos campos e encerrar modal
            Form.clearFields()
            Modal.close()


        } catch (Error){
            alert(Error.message)
        }

    }
}
