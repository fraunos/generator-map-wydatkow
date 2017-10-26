let testdata = `name,parent,size
rzyć,root,
grocery,rzyć,
elektronika,rzyć,
ubranko,rzyć,
jedzonko,grocery,
guma do żucia,jedzonko,20
skarpetki,ubranko,50
kabelek usb,elektronika,30
rogalik,jedzonko,10
majtki,ubranko,100
powerbank,elektronika,300`;

function parseCSVtoJSON(data) {
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
    json.size = parseInt(json.size)
    result.push(json)
  }
  return result
}

function parseJSONtoTree(data) {
  let root = data.find(item => {
    return item.parent === 'root'
  })
  root = getChildrenAndSize(data, root, 1)

  return root;
}

function getChildrenAndSize(flatArray, element) {

  temp = flatArray.filter(item => {
    return item.parent === element.name
  })

  if (temp === []) {
    return []
  }
  element.children = temp
  if (isNaN(element.size)) {
    element.size = 0
  }
  for (variable of element.children) {
    variable = getChildrenAndSize(flatArray, variable)
    if (!isNaN(variable.size) && variable.size !== undefined) {
      element.size += variable.size
    }
  }
  return element
}

console.log(parseJSONtoTree(parseCSVtoJSON(testdata)));
