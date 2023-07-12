import PatientRepo from "../repo/patient.repo";
import { Service } from "typedi";

type PatientRepoType = typeof PatientRepo;

@Service()
class PatientService {
  constructor(private PatientRepo: PatientRepoType) {}

  getAllPatients = (): Record<string, string> => {
    // 資料庫操作，調用 PatientModel 的方法
    return { message: "Hello World!" };
  };

  getPatientById = (id: string) => {
    // 資料庫操作，調用 PatientModel 的方法
    return { message: "Hello World!" };
  };

  createPatient = (patientData: any) => {
    // 資料庫操作，調用 PatientModel 的方法
    return { message: "Hello World!" };
  };

  updatePatient = (id: string, patientData: any) => {
    // 資料庫操作，調用 PatientModel 的方法
    return { message: "Hello World!" };
  };

  deletePatient = (id: string) => {
    // 資料庫操作，調用 PatientModel 的方法
    return { message: "Hello World!" };
  };
}

export default PatientService;
