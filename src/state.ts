import { proxy, useSnapshot } from "valtio"

const maxSteps = 5

class State {
  step = 0
  get canNext() {
    return this.step < maxSteps - 1
  }
  get canPrev() {
    return this.step > 0
  }
  get transforms() {
    return {
      model: this.step >= 1,
      view: this.step >= 2,
      projection: this.step >= 3,
      screen: this.step >= 4,
    }
  }
}

const state = proxy(new State())

export { state, useSnapshot }
