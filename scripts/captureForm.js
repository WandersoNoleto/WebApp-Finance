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

    //Formatar dados inseridos
    formatData(){

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

    formatValues(){
        let { description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)
    },

    submit(event){3
        event.preventDefault() //retirar comportamento padrão de submit para aplicar os procedimentos desejados 
     
        try {
            Form.validateField()

            Form.formatValues()


        } catch (Error){
            alert(Error.message)
        }

    }
}
