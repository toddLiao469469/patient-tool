import { prop, getModelForClass, modelOptions,pre } from '@typegoose/typegoose';

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
export class Patient {
  @prop({ required: true, unique: true, index: true })
  patientId!: string;

  @prop({ required: true })
  name!: string;

  @prop()
  orderId?: string;
}

@pre<Patient>('save', function (next) {
  if (this.isNew) {
    this.patientId = this._id.toString();
  }
  next();
})
class PatientClass extends Patient {}

const PatientModel = getModelForClass(PatientClass);

export default PatientModel;
