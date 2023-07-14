import Container, { Service } from 'typedi';

import PatientModel, { Patient } from '../model/patient.model';

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
}

export default PatientService;
