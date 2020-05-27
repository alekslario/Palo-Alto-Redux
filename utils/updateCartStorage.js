import contactServer from "./contactServer";
import cookie from "js-cookie";

let data = {};
let handler = null;
export const updateCartStorage = ({ productId, contentId, modifier }) => {
  data[productId] = {
    contentId,
    quantity: (data[productId]?.quantity || 0) + modifier,
  };
  const sendToServer = async () => {
    const payloadProducts = { ...data };
    data = {};
    console.log("sending to server");
    let token = cookie.get("token");
    if (token) {
      const response = await contactServer({
        data: {
          payloadProducts,
        },
        route: "cart",
        auth: token,
        method: "POST",
      });
      console.log("response", response);
      //handle errors better //todo
      if (response?.status === 403) {
        cookie.remove("token");
        token = null;
      }
    }
    if (!token) {
      try {
        // find more efficient wat to do it //todo
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let productFound = false;
        let updatedCart = [];
        for (let x = 0; x < cart.length; x++) {
          if (cart[x].productId === productId) {
            if (cart[x].quantity + modifier === 0) {
              productFound = true;
              continue;
            }
            cart[x].quantity += modifier;
            updatedCart.push(cart[x]);
            productFound = true;
          } else {
            updatedCart.push(cart[x]);
          }
        }
        if (!productFound) {
          updatedCart.push({ productId, contentId, quantity: 1 });
        }
        if (updatedCart.length > 0) {
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        } else {
          localStorage.removeItem("cart");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (handler) clearTimeout(handler);
  handler = setTimeout(() => {
    sendToServer();
  }, 1500);
};

export const removeFromCartStorage = async ({ productId }) => {
  let token = cookie.get("token");
  if (token) {
    const response = await contactServer({
      data: { productId },
      route: "cart",
      auth: token,
      method: "DELETE",
    });
    //handle errors better //todo
    if (response.status === 403) {
      cookie.remove("token");
      token = null;
    }
  }
  if (!token) {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = cart.map((ele) => {
        if (ele.productId === productId) {
          return;
        } else {
          return ele;
        }
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  }
};
