export interface Patient {
  patientId: string;
  name: string;
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  orderId: string;
  message: string;
}
