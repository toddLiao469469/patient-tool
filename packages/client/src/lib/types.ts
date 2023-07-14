export interface Patient {
  id: string;
  name: string;
  orderId?: string;
}

export interface Order {
  id: string;
  message: string;
}
