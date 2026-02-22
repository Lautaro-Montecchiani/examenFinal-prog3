import api from "./client";

export interface CheckoutData {
    client: { name: string; lastname: string; email: string; telephone: string };
    bill: { bill_number: string; discount: number; payment_type: string };
    items: { product_id: number; quantity: number; price: number }[];
    total: number;
}

export async function processCheckout(data: CheckoutData) {
    try {
        // 1. Create client
        const clientRes = await api.post("/clients/", data.client);
        const clientId = clientRes.data.id_key;

        // 2. Create bill
        const today = new Date().toISOString().split('T')[0];
        const billRes = await api.post("/bills/", {
            ...data.bill,
            date: today,
            total: data.total
        });
        const billId = billRes.data.id_key;

        // 3. Create order
        const orderRes = await api.post("/orders/", {
            date: new Date().toISOString(),
            total: data.total,
            delivery_method: 3, // HOME_DELIVERY
            status: 1, // PENDING
            client_id: clientId,
            bill_id: billId
        });
        const orderId = orderRes.data.id_key;

        // 4. Create order details
        for (const item of data.items) {
            await api.post("/order_details/", {
                quantity: item.quantity,
                price: item.price,
                order_id: orderId,
                product_id: item.product_id
            });
        }

        return orderId;
    } catch (error: any) {
        console.error("Checkout error:", error);
        throw new Error(error.response?.data?.detail || "Checkout failed");
    }
}
