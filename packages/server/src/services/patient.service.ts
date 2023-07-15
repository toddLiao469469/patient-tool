import Container, { Service } from 'typedi';

import PatientModel, { Patient } from '../model/patient.model';

interface updatePatientOrderInput {
  orderId: string;
}

@Service()
class PatientService {
  constructor() {
    this.patientModel = Container.get('PatientModel');
  }
  private patientModel: typeof PatientModel;

  getAllPatients = async (): Promise<Patient[]> => {
    const result = await this.patientModel.find().lean();
    return result;
  };

  updatePatientOrder = async (
    patientId: string,
    input: updatePatientOrderInput,
  ): Promise<Patient> => {
    const { orderId } = input;

    const result = await this.patientModel
      .findOneAndUpdate({ patientId }, { orderId }, { new: true })
      .lean();

    if (!result) {
      throw new Error('Patient not found');
    }

    return result;
  };
}

export default PatientService;
