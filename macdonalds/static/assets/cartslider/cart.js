function openNav() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        window.location.replace("/cart");
    } else {
        let obj = document.getElementById('mySidenav');
        if (obj.getBoundingClientRect().left > window.pageXOffset + document.documentElement.clientWidth) {
            obj.classList.add('opened');
            obj.classList.remove('closed');
        } else {
            obj.classList.add('closed');
            obj.classList.remove('opened');
        }
    }
}


function toCurrency(num) {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
    }).format(num);
}


function AddToCart(id, img, name, description, price) {
    productObj = new Product(id, img, name, description, price);
    let addedFlag = false;
    for (let i = 0; i < myCart.products.length; i++) {
        if (myCart.products[i].id === productObj.id) {
            myCart.products[i].counter += 1;
            addedFlag = true;
        }
    }
    if (!addedFlag) {
        myCart.addProduct(productObj);
    }
    localStorage.setItem("cart", JSON.stringify(myCart));
    cartNum.textContent = myCart.count;
    console.log(myCart.products)
}

class Product {
    constructor(id, img, name, description, price) {
        this.id = id;
        this.img = img;
        this.name = name;
        this.description = description;
        this.price = price;
        this.counter = 1;
    }
}

class Cart {
    products;

    constructor() {
        this.products = [];
    }

    get count() {
        let value = 0;
        for (let i = 0; i < myCart.products.length; i++) {
            value += myCart.products[i].counter;
        }
        return value;
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(index) {
        this.products.splice(index, 1);
    }

    removeAll() {
        this.products = []
        cartNum.textContent = myCart.count;
        localStorage.setItem("cart", JSON.stringify(myCart));
    }

    get cost() {
        const prices = this.products.map((product) => {
            return toNum(product.price);
        });
        return prices.reduce((acc, num) => {
            return acc + num;
        }, 0);
    }

}

const myCart = new Cart();

if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
}
const cartNum = document.querySelector("#cart_num");
const savedCart = JSON.parse(localStorage.getItem("cart"));
myCart.products = savedCart.products;
cartNum.textContent = myCart.count;