import contactServer from "./contactServer";
import cookie from "js-cookie";

export const updateCartStorage = async ({ productId, contentId, modifier }) => {
  let token = cookie.get("token");
  if (token) {
    const response = await contactServer({
      data: { payloadProducts: { [productId]: modifier } },
      route: "cart",
      auth: token,
      method: "PUT"
    });
    console.log("response", response);
    //handle errors better //todo
    if (response.status === 403) {
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
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  }
};

export const removeFromCartStorage = async ({ productId }) => {
  let token = cookie.get("token");
  if (token) {
    const response = await contactServer({
      data: { productId },
      route: "cart",
      auth: token,
      method: "DELETE"
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
      const updatedCart = cart.map(ele => {
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
