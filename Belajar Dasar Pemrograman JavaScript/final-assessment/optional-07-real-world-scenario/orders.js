// Gunakan fungsi di bawah ini untuk menghasilkan id yang unik
function generateUniqueId() {
  return `_${Math.random().toString(36).slice(2, 9)}`;
}


// TODO: buatlah variabel yang menampung data orders
let orders = [];

// TODO: selesaikan fungsi addOrder
function addOrder(customerName, items) {
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);
  
  const newOrder = {
    id: generateUniqueId(),
    customerName: customerName,
    items: items,
    totalPrice: totalPrice,
    status: 'Menunggu' // Status awal
  };
  
  orders.push(newOrder);
}

// TODO: selesaikan fungsi updateOrderStatus
function updateOrderStatus(orderId, status) {
  const order = orders.find(order => order.id === orderId);
  if (order) {
    order.status = status;
  } else {
    console.log(`Order dengan ID ${orderId} tidak ditemukan.`);
  }
}

// TODO: selesaikan fungsi calculateTotalRevenue dari order yang berstatus Selesai
function calculateTotalRevenue() {
  return orders
    .filter(order => order.status === 'Selesai')
    .reduce((total, order) => total + order.totalPrice, 0);
}

// TODO: selesaikan fungsi deleteOrder
function deleteOrder(id) {
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex !== -1) {
    orders.splice(orderIndex, 1);
  } else {
    console.log(`Order dengan ID ${id} tidak ditemukan.`);
  }
}

export { orders, addOrder, updateOrderStatus, calculateTotalRevenue, deleteOrder };
