class Calculator {
  constructor() {
    this.value = 0
  }

  add(value) {
    this.value = this.value + value
    return this.value
  }

  subtract(value) {
    this.value = this.value - value
  }

  multiply(value) {
    this.value = this.value * value
  }

  divide(value) {
    this.value = this.value / value
  }
}

const calculator = new Calculator()
async function a() {
  let a = await calculator.add(10)
  let b = await calculator.add(a)
  console.log(b)
}
a()


console.log(calculator.value)