class Calculator
{
    constructor(previousOperandTextElement, currentOperandTextElement)
    {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
  

    clear()
    {
      this.currentOperand = '0'
      this.previousOperand = ''
      this.operation = undefined
    }
  

    delete()
    {
      if (this.currentOperand === '0')
        this.currentOperand = '0'
      else
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
  

    appendNumber(number)
    {
      if (number === '.' && this.currentOperand.includes('.'))
        return

      this.currentOperand = this.currentOperand.toString() + number.toString()
    }
  

    chooseOperation(operation)
    {
      if (this.currentOperand === '')
        return

      if (this.previousOperand !== '')
        this.compute()

      this.operation = operation
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
    }
  

    compute()
    {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)

      if (isNaN(prev) || isNaN(current))
        return

      switch (this.operation)
      {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case '*':
          computation = prev * current
          break
        case '÷':
          computation = prev / current
          break
        case '%':
          computation = prev / 100 * current
          break
        case '^':
          computation = Math.pow(prev, current)
          break
        default:
          return
      }

      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }


    getDisplayNumber(number)
    {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay

      if (isNaN(integerDigits))
        integerDisplay = ''
      else
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })

      if (decimalDigits != null)
        return `${integerDisplay}.${decimalDigits}`
      else
        return integerDisplay
    }
  

    updateDisplay()
    {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

      if (this.operation != null)
      {
        if (this.operation === 'xy')
          this.operation = '^'

        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      }
      else
        this.previousOperandTextElement.innerText = ''
    }


    science(scop)
    {
      if (scop === 'sin')
      {
        this.previousOperandTextElement.innerText = `sin(${this.getDisplayNumber(this.currentOperand)})`
        this.currentOperandTextElement.innerText = `${Math.sin(this.currentOperand)}`
      }
      else if (scop === 'cos')
      {
        this.previousOperandTextElement.innerText = `cos(${this.getDisplayNumber(this.currentOperand)})`
        this.currentOperandTextElement.innerText = `${Math.cos(this.currentOperand)}`
      }
      else if (scop === 'tan')
      {
        this.previousOperandTextElement.innerText = `tan(${this.getDisplayNumber(this.currentOperand)})`
        this.currentOperandTextElement.innerText = `${Math.tan(this.currentOperand)}`
      }
      else if (scop === 'log')
      {
        this.previousOperandTextElement.innerText = `log(${this.getDisplayNumber(this.currentOperand)})`
        this.currentOperandTextElement.innerText = `${Math.log10(this.currentOperand)}`
      }
      else if (scop === 'ln')
      {
        this.previousOperandTextElement.innerText = `ln(${this.getDisplayNumber(this.currentOperand)})`
        this.currentOperandTextElement.innerText = `${Math.log(this.currentOperand)}`
      }
      else if (scop === '1/x')
      {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.currentOperand)}^(-1)`
        this.currentOperandTextElement.innerText = `${Math.pow(this.currentOperand, -1)}`
      }
    }

    sqrt()
    {
      this.previousOperandTextElement.innerText = `sqrt(${this.getDisplayNumber(this.currentOperand)})`
      this.currentOperandTextElement.innerText = `${Math.sqrt(this.currentOperand)}`
    }


    consts(con)
    {
      if (con === 'e')
      {
        this.previousOperandTextElement.innerText += ' e'
        this.currentOperand = `${Math.E}`
        this.currentOperandTextElement.innerText = `${Math.E}`
      }
      else
      {
        this.previousOperandTextElement.innerText += ' π'
        this.currentOperand = `${Math.PI}`
        this.currentOperandTextElement.innerText = `${Math.PI}`
      }
    }
}
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const scientificButtons = document.querySelectorAll('[data-sc]')
  const sqrtButton = document.querySelector('[data-sqrt]')
  const constantButtons = document.querySelectorAll('[data-const]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

  
  numberButtons.forEach(button =>
  {
    button.addEventListener('click', () =>
    {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
  

  operationButtons.forEach(button =>
  {
    button.addEventListener('click', () =>
    {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
  })


  scientificButtons.forEach(button =>
  {
    button.addEventListener('click', () =>
    {
      calculator.science(button.innerText)
    })
  })


  constantButtons.forEach(button =>
  {
    button.addEventListener('click', () =>
    {
      calculator.consts(button.innerText)
    })
  })


  sqrtButton.addEventListener('click', button =>
  {
    calculator.sqrt()
  })


  equalsButton.addEventListener('click', button =>
  {
    calculator.compute()
    calculator.updateDisplay()
  })
  

  allClearButton.addEventListener('click', button =>
  {
    calculator.clear()
    calculator.updateDisplay()
  })
  

  deleteButton.addEventListener('click', button =>
  {
    calculator.delete()
    calculator.updateDisplay()
  })