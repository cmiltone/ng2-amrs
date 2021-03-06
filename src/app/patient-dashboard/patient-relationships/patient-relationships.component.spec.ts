import { TestBed, async } from '@angular/core/testing';
import { PatientService } from '../patient.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
    ProgramEnrollmentResourceService
} from '../../openmrs-api/program-enrollment-resource.service';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrConfig, ToastrService, Overlay, OverlayContainer } from 'toastr-ng2';
import { PatientResourceService } from '../../openmrs-api/patient-resource.service';
import { LocalStorageService } from '../../utils/local-storage.service';
import { EncounterResourceService } from '../../openmrs-api/encounter-resource.service';
import { PatientRelationshipService } from './patient-relationship.service';
import {
    PatientRelationshipResourceService
 } from '../../openmrs-api/patient-relationship-resource.service';
import { PatientRelationshipsComponent } from './patient-relationships.component';

describe('Component: PatientRelationships', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MockBackend,
                PatientRelationshipService,
                BaseRequestOptions,
                PatientService,
                PatientResourceService,
                LocalStorageService,
                PatientRelationshipResourceService,
                ProgramEnrollmentResourceService,
                EncounterResourceService,
                PatientRelationshipsComponent,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend,
                        defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                AppSettingsService
            ]

        });
    });

    afterEach(() => {
        TestBed.resetTestingModule();
    });

    it('should instantiate the component', (done) => {
        let component: PatientRelationshipsComponent = TestBed.get(PatientRelationshipsComponent);
        expect(component).toBeTruthy();
        done();

    });

    it('should have all the required functions defined and callable', (done) => {
        let component: PatientRelationshipsComponent = TestBed.get(PatientRelationshipsComponent);
        let reminders = [];
        spyOn(component, 'ngOnInit').and.callThrough();
        component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
        spyOn(component, 'getPatientRelationships').and.callThrough();
        component.getPatientRelationships();
        expect(component.getPatientRelationships).toHaveBeenCalled();

        done();

    });

});
