class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {

  addProduct(product) {
    const productList = document.getElementById('product-list')
    const element = document.createElement('div');
    element.innerHTML = `
      <div class="card text-center mb-4">
        <div class="card-body d-flex align-items-center justify-content-around">
          <div class="text-left d-flex flex-column">
            <span><strong>Product name</strong>: ${product.name}</span>
            <span><strong>Price</strong>: ${product.price}</span>
            <span><strong>Year</strong>: ${product.year}</span>
          </div>
            <a href="#" name="delete" class="btn btn-danger">Delete</a>
        </div>
      </div>
    `;
    productList.appendChild(element)
  }

  resetForm() {
    document.getElementById('product-form').reset()
  }

  deleteProduct(element) {
    if (element.name === 'delete') {
      element.parentElement.parentElement.parentElement.remove()
      this.showMessage('Product delete successfully', 'danger')
    }
  }

  showMessage(message, color) {
    const div = document.createElement('div')
    div.className = `alert alert-${color} mt-2`;
    div.appendChild(document.createTextNode(message))
    //Mostrando en el dom
    const container = document.querySelector('.container')
    const app = document.querySelector('#App')
    container.insertBefore(div, app)
    //Tiempo del mensaje
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 3000)
  }
}

//DOM events
document.getElementById('product-form').addEventListener('submit', function (e) {
  const name = document.getElementById('name').value
  const price = document.getElementById('price').value
  const year = document.getElementById('year').value

  const product = new Product(name, price, year)

  const ui = new UI()
  //Verifica que lo campos no esten vacios
  if (name === '' || price === '' || year === '') {
    return ui.showMessage('Complete fields please', 'warning')
  }

  ui.addProduct(product)
  ui.resetForm()
  ui.showMessage('Product Added Successfully', 'success')
  document.getElementById('name').focus()
  e.preventDefault() //e de Evento que recibe
})

document.getElementById('product-list').addEventListener('click', function (e) {
  const ui = new UI()
  ui.deleteProduct(e.target)
})