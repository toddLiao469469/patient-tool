import { prop, getModelForClass, modelOptions,pre } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    collection: 'orders',
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
    versionKey: false,
    strict: false,
    toObject: {
      transform(_doc, ret: Record<string, unknown>) {
        delete ret._id;
        return ret;
      },
    },
  },
})
export class Order {
  @prop({ required: true, unique: true, index: true })
  orderId!: string;
  
  @prop({ required: true })
  message!: string;
}



const OrderModel = getModelForClass(Order);



export default OrderModel;
