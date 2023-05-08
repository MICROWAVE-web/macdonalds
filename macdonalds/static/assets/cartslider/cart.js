function openNav() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        let obj = document.getElementById('mySidenav');
        if (obj.getBoundingClientRect().left > window.pageXOffset + document.documentElement.clientWidth) {
            obj.style.width = '100vw';
            obj.classList.add('opened');
            obj.classList.remove('closed');
        } else {
            obj.classList.add('closed');
            obj.classList.remove('opened');
        }
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
    cartNum2.textContent = myCart.count;
    render();
    console.log(myCart.products)
}

function render() {
    if (myCart.count > 0) {
        document.getElementById('clear_button').style.display = 'block';
        document.getElementById('cart_confirm_button').style.display = 'block';
        document.getElementById('total_amount').textContent = myCart.total_cost
        document.getElementById('empty-cart').style.display = 'none';

    } else {
        document.getElementById('clear_button').style.display = 'none';
        document.getElementById('cart_confirm_button').style.display = 'none';
        document.getElementById('empty-cart').style.display = 'block';
    }
    document.getElementById('cart_card_list').innerHTML = "";
    for (let i = 0; i < myCart.products.length; i++) {
        let block_html = `
    <div class="cart_card">
        <hr>
        <div class="cart_card_img">
            <img class="card_img"
                 src="media/${myCart.products[i].img}"
                 alt="2">
        </div>
        <div class="card_text">
            <h4 class="card-title mbr-bold mbr-fonts-style display-5">${myCart.products[i].name}</h4>
            <p class="mbr-text mbr-semibold mbr-fonts-style display-7">${myCart.products[i].description}<br>
            </p>
        </div>
        <div class="bottom_card">
            <div class="change_counter">
                <div class="change_counter_countroll">
                    <div class="ctrl_style controll_plus" onclick="myCart.upCounter(${i})">+</div>
                    <div class="ctrl_style controll_minus" onclick="myCart.downCounter(${i})">&minus;</div>
                </div>
                <div class="p-2 card_count">${myCart.products[i].counter} шт.</div>
            </div>
            <div class="p-2 card_summary_amount">${myCart.products[i].price * myCart.products[i].counter} Руб.</div>
            <div class="p-2 card_remove" onclick="myCart.removeProduct(${i})">Удалить</div>
        </div>
    </div>`;
        document.getElementById('cart_card_list').innerHTML += block_html;
    }


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
        localStorage.setItem("cart", JSON.stringify(myCart));
        cartNum.textContent = myCart.count;
        cartNum2.textContent = myCart.count;
        render();
    }

    upCounter(index) {
        for (let i = 0; i < myCart.products.length; i++) {
            if (index === i) {
                myCart.products[i].counter += 1;
                cartNum.textContent = myCart.count;
                cartNum2.textContent = myCart.count;
                render();
                return;
            }
        }
    }

    downCounter(index) {
        for (let i = 0; i < myCart.products.length; i++) {
            if (index === i) {
                myCart.products[i].counter -= 1;
                cartNum.textContent = myCart.count;
                cartNum2.textContent = myCart.count;
                if (myCart.products[i].counter === 0) {
                    myCart.removeProduct(index)
                }
                render();
                return;
            }
        }
    }

    removeAll() {
        this.products = []
        cartNum.textContent = myCart.count;
        cartNum2.textContent = myCart.count;
        localStorage.setItem("cart", JSON.stringify(myCart));
        render();
    }

    get total_cost() {
        let value = 0;
        for (let i = 0; i < myCart.products.length; i++) {
            value += myCart.products[i].price * myCart.products[i].counter;
        }
        return value;
    }

}

const myCart = new Cart();

if (localStorage.getItem("cart") == null) {
    localStorage.setItem("cart", JSON.stringify(myCart));
}
const cartNum = document.querySelector("#cart_num");
const cartNum2 = document.querySelector("#cart_num2");
const savedCart = JSON.parse(localStorage.getItem("cart"));
myCart.products = savedCart.products;
cartNum.textContent = myCart.count;
cartNum2.textContent = myCart.count;
render();