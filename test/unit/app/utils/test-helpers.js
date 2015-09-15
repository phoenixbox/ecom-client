module.exports = {
  between(x, margin) {
    return x >= margin.min && x <= margin.max;
  },
  marginCalc(target, margin) {
    return {
      min: target * margin,
      max: target+(target * (1-margin))
    }
  }
}
