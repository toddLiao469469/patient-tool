import { JsonController, Get } from "routing-controllers";
import { Inject, Service } from "typedi";

import PatientService from "../services/patient.service";

@JsonController("/patients")
@Service()
class PatientController {
  constructor(@Inject() private patientService: PatientService) {}

  @Get("/")
  getAllPatients() {
    return this.patientService.getAllPatients();
  }
}

export default PatientController;
