// Simple cart utility using localStorage for persistence
const CART_KEY = 'desinar_cart'
const SELECTED_KEY = 'desinar_cart_selected'

function read() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch (e) {
    return []
  }
}

function write(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

function getCart() {
  return read()
}

function saveCart(items) {
  write(items)
}

function addToCart(item) {
  const cart = read()
  const existing = cart.find(c => c.id === item.id)
  if (existing) {
    existing.quantity = (existing.quantity || 1) + (item.quantity || 1)
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 })
  }
  write(cart)
  return cart
}

function removeFromCart(id) {
  const cart = read().filter(i => i.id !== id)
  write(cart)
  return cart
}

function updateQuantity(id, qty) {
  const cart = read()
  const item = cart.find(c => c.id === id)
  if (item) {
    item.quantity = qty
    if (item.quantity <= 0) {
      return removeFromCart(id)
    }
    write(cart)
  }
  return cart
}

function clearCart() {
  write([])
}

function getSelected() {
  try {
    return JSON.parse(localStorage.getItem(SELECTED_KEY) || '[]')
  } catch (e) {
    return []
  }
}

function setSelected(ids) {
  localStorage.setItem(SELECTED_KEY, JSON.stringify(ids))
}

function getSelectedItems() {
  const cart = read()
  const sel = getSelected()
  return cart.filter(i => sel.includes(i.id))
}

export { getCart, saveCart, addToCart, removeFromCart, updateQuantity, clearCart, getSelected, setSelected, getSelectedItems }
