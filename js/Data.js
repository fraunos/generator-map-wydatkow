class Data {
  // let nodes = []


  constructor(data) {
    let temp = data.split('\n').map(item => {
      return item.split(',')
    })
    let label = temp.shift()

    let result = []

    for (var node of temp) {
      let json = {}
      for (var variable in node) {
        json[label[variable]] = node[variable]
      }
      result.push(json)
    }

    this.nodes = result
  }

  function genParents() {

  }
}
