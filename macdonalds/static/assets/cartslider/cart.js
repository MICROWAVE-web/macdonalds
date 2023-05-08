function openNav() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        window.location.replace("/cart");
    } else {
        let obj = document.getElementById('mySidenav')
        if (obj.getBoundingClientRect().width === 0) {
            //document.getElementById("mySidenav").style.width = "250px";
            obj.classList.add('opened');
            obj.classList.remove('closed');
        } else {
            //document.getElementById("mySidenav").style.width = "0";

            obj.classList.add('closed');
            obj.classList.remove('opened');
        }
    }
}


class Product {
    constructor(img, name, description, price) {
        this.img = img;
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

class Cart {
    products;

    constructor() {
        this.products = [];
    }

    get count() {
        return this.products.length;
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(index) {
        this.products.splice(index, 1);
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