// constructor
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
//default
    clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
      this.error = ''
      this.sign = ''
    }
  //trying out to change sign
    flipSign() {
      if(this.sign = ''|| '+') return this.sign ='-'
      else return this.sign ='+'
    }

    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  //checking for error with 0,appending the number
    appendNumber(number) {
      if (this.error) {
        this.clear()
      }
      if (number === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  //pre-computation operation check
    chooseOperation(operation) {
      if (this.currentOperand === '') return
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
    
  //computation. added parseFloat cuz of their 64 bit unprecisiveness
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = parseFloat((prev + current).toFixed(10))
          break
        case '-':
          computation = parseFloat((prev - current).toFixed(10))
          break
        case '*':
          computation = parseFloat((prev * current).toFixed(10))
          break
        case '÷':
          if(current === 0) {
            this.error = "Error"
          }
          else
          computation = parseFloat((prev / current).toFixed(10))
          break            
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
  //getting a number , converting them from string, getting either a integer or a decimal .
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
    
  //updating upper display, post-computation
    updateDisplay() {
      if (this.error) {
        this.currentOperandTextElement.innerText = this.error
        this.previousOperandTextElement.innerText = ""
        return;
      }
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } 
      else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }
  
  //grabbing html via JS
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  const changeSign = document.querySelector('[data-sign]')
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


  //adding onclick events. still need keyboard events.

  window.addEventListener('keydown', checkKeyPress, false)

  function checkKeyPress(key) {
    if (key.keycode == "65") {
      alert("yes")
    }
  }


  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })

  changeSign.addEventListener('click' , event => {
    calculator.flipSign()
  })

  equalsButton.addEventListener('click', event => {
    calculator.compute()
    calculator.updateDisplay()
  })
  
  allClearButton.addEventListener('click', event => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', event => {
    calculator.delete()
    calculator.updateDisplay()
  })
/*
//creating storage and storing results
  let itemsArray = []
  localStorage.setItem('items', JSON.stringify(itemsArray))
  const data = JSON.parse(localStorage.getItem('items'))

//adding items into the storage
  itemsArray.push(input.value)
localStorage.setItem('items', JSON.stringify(itemsArray))  */