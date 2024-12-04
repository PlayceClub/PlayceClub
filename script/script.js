document.addEventListener("DOMContentLoaded", () => {    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
    const cartList = document.getElementById("cart-list");
    const totalCostElement = document.getElementById("total-cost");

    let cart = {}; // Хранение товаров в корзине
    let totalCost = 0;

    // Функция обновления количества на экране
    function updateItemCount(itemName) {
        const countElement = document.querySelector(`.item-count[data-name="${itemName}"]`);
        const item = cart[itemName];
        if (item && item.quantity > 0) {
            countElement.textContent = `x${item.quantity}`;
        } else {
            countElement.textContent = "x0";
        }
    }

    // Функция обновления корзины
    function updateCart() {
        cartList.innerHTML = "";
        for (let itemName in cart) {
            const item = cart[itemName];
            const li = document.createElement("li");
            li.textContent = `${itemName} x${item.quantity} - ${item.price * item.quantity} руб.`;
            cartList.appendChild(li);
        }
        totalCostElement.textContent = `${totalCost} руб.`;
    }

    // Добавление товара
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            if (cart[itemName]) {
                cart[itemName].quantity++;
            } else {
                cart[itemName] = { price: itemPrice, quantity: 1 };
            }

            totalCost += itemPrice; // Увеличиваем общую стоимость
            updateItemCount(itemName); // Обновляем количество xN
            updateCart(); // Обновляем корзину
        });
    });

    // Удаление товара
    removeFromCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            if (cart[itemName] && cart[itemName].quantity > 0) {
                cart[itemName].quantity--;
                totalCost -= itemPrice;

                if (cart[itemName].quantity === 0) {
                    delete cart[itemName]; // Удаляем товар, если количество равно 0
                }
            }

            updateItemCount(itemName); // Обновляем количество xN
            updateCart(); // Обновляем корзину
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const toggleCartButton = document.getElementById("toggle-cart");
    const cartPanel = document.getElementById("cart-panel");

    // Переключение состояния панели корзины
    toggleCartButton.addEventListener("click", () => {
        cartPanel.classList.toggle("open");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const removeFromCartButtons = document.querySelectorAll(".remove-from-cart");
    const cartList = document.getElementById("cart-list");
    const totalCostElement = document.getElementById("total-cost");
    const submitOrderButton = document.getElementById("submit-order");

    let cart = {}; // Хранение товаров в корзине
    let totalCost = 0;

    // Функция для обновления корзины
    function updateCart() {
        cartList.innerHTML = "";
        for (let itemName in cart) {
            const item = cart[itemName];
            const li = document.createElement("li");
            li.textContent = `${itemName} x${item.quantity} - ${item.price * item.quantity} руб.`;
            cartList.appendChild(li);
        }
        totalCostElement.textContent = `${totalCost} руб.`;
    }

    // Добавление товара
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            if (cart[itemName]) {
                cart[itemName].quantity++;
            } else {
                cart[itemName] = { price: itemPrice, quantity: 1 };
            }

            totalCost += itemPrice; // Увеличиваем общую стоимость
            updateCart();
        });
    });

    // Удаление товара
    removeFromCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const itemName = button.getAttribute("data-name");
            const itemPrice = parseInt(button.getAttribute("data-price"));

            if (cart[itemName] && cart[itemName].quantity > 0) {
                cart[itemName].quantity--;
                totalCost -= itemPrice;

                if (cart[itemName].quantity === 0) {
                    delete cart[itemName]; // Удаляем товар, если количество равно 0
                }
            }

            updateCart();
        });
    });

    // Отправка заказа в Telegram
    submitOrderButton.addEventListener("click", () => {
        if (Object.keys(cart).length === 0) {
            alert("Ваша корзина пуста!");
            return;
        }

        const botToken = "7978127151:AAEiJVWSEmrXn6pj26O3C8HrSNVmKZYKyDA"; // Укажите токен вашего бота
        const chatId = "-1002380518129"; // Укажите ID чата

        // Формируем сообщение
        let message = `🛒 Новый заказ стола: 20\n`;
        for (let itemName in cart) {
            const item = cart[itemName];
            message += `${itemName} x${item.quantity} - ${item.price * item.quantity} руб.\n`;
        }
        message += `\n💰 Общая стоимость: ${totalCost} руб.`;

        // Отправляем заказ в Telegram
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
            .then(response => {
                if (response.ok) {
                    alert("Заказ успешно отправлен официанту");
                    cart = {}; // Очищаем корзину
                    totalCost = 0;
                    updateCart(); // Обновляем интерфейс
                } else {
                    alert("Ошибка отправки заказа.");
                }
            })
            .catch(error => {
                console.error("Ошибка:", error);
                alert("Ошибка отправки заказа.");
            });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-icon");
    const cartContainer = document.getElementById("cart-container");

    // Переключение состояния корзины (открыть/закрыть)
    cartIcon.addEventListener("click", () => {
        cartContainer.classList.toggle("open");
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("search-bar");
    const categoryFilter = document.getElementById("category-filter");
    const menuItems = document.querySelectorAll(".menu-item");

    // Фильтрация по категории
    categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        menuItems.forEach(item => {
            if (selectedCategory === "all" || item.dataset.category === selectedCategory) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });

    // Поиск по названию
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase();
        menuItems.forEach(item => {
            const itemName = item.querySelector("h4").textContent.toLowerCase();
            if (itemName.includes(query)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});
