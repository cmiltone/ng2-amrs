import { Component, OnInit } from '@angular/core';

import { LabsResourceService } from '../../etl-api/labs-resource.service';
import { PatientService } from '../patient.service';
import * as Moment from 'moment';

@Component({
    selector: 'lab-sync',
    templateUrl: 'lab-sync.component.html'
})
export class LabSyncComponent implements OnInit {
    patient: any;
    results = [];
    error: string;
    loadingPatient: Boolean;
    fetchingResults: Boolean;
    constructor(private labsResourceService: LabsResourceService,
        private patientService: PatientService) { }

    ngOnInit() {
        this.loadingPatient = true;
        this.patientService.currentlyLoadedPatient.subscribe(
            (patient) => {
                this.loadingPatient = false;
                if (patient) {
                    this.patient = patient;
                    this.getNewResults();
                }
            }
        );
    }
    getNewResults() {
        this.fetchingResults = true;
        let startDate = Moment('2006-01-01').startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
        let endDate = Moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
        this.labsResourceService.getNewPatientLabResults({
            startDate: startDate,
            endDate: endDate,
            patientUuId: this.patient.person.uuid
        }).subscribe((result) => {
            this.fetchingResults = false;
            this.results = result;
        }, (err) => {
            this.fetchingResults = false;
            this.error = err;
        });
    }
}
