import { JsonController, Get, Post, Body, Param } from 'routing-controllers';
import { Inject, Service } from 'typedi';

import PatientService from '../services/patient.service';

@JsonController()
@Service()
class PatientController {
  constructor(@Inject() private patientService: PatientService) {}

  @Get('/patients')
  getAllPatients() {
    return this.patientService.getAllPatients();
  }

  @Post('/patient/:id/updateOrder')
  updatePatientOrder(
    @Param('id') id: string,
    @Body() body: { patientId: string; orderId: string },
  ) {
    return this.patientService.updatePatientOrder(id, body);
  }
}

export default PatientController;
