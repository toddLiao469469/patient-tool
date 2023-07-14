import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';


@modelOptions({
  schemaOptions: {
    collection: 'patients',
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
export class Patient  {
  @prop({ required: true })
  name!: string;

  @prop()
  orderId?: string;
}

const PatientModel = getModelForClass(Patient);

export default PatientModel;
