import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { Parameterisation } from '../../interfaces/parameterisation';
import { InsertData } from '../../interfaces/insert-data';

// import { CookieService } from 'angular2-cookie/core';
import { ElectronApiService } from '../../services/server-api-services/electron-api.service';
import { DataService } from '../../services/data-services/data.service';
import { TitleService } from '../../services/utility-services/title.service';
import { DataPersistenceService } from '../../services/data-services/data-persistence.service'
import { CurrentSettings } from '../../services/data-services/current-settings'
// import { LocalStorageService } from './local-storage.service';

import { ModelData } from '../../services/data-services/model-data'

import { DEMO_PARAMETERISE_INPUT } from '../../services/data-services/demo-data';

@Component({
  selector: 'my-parameterise',
  templateUrl: 'parameterise.component.html',
})
export class ParameteriseComponent implements OnInit {
  parameterisation: Parameterisation = {
    insert: {
      x: [0],
      y: [0]
    },
    width: null,
    length: null,
    circle: null,
    ellipse: null,
    measuredFactor: null
  };
  machineSpecifications: {};

  // @ViewChild('jsonInput') jsonInputComponent: any;

  textAreaX: string;
  textAreaY: string;

  jsonValid: boolean = true;
  xInputValid: boolean = true;
  yInputValid: boolean = true;
  equalLengths: boolean = true;

  serverResponseValid: boolean = true;
  serverErrorMessage: string;

  dataInFlight: boolean = false;

  submitDisabled: boolean = false;

  refreshJsonInput: boolean = false;

  parameteriseURL: string;

  insertData: InsertData = {
    machine: null,
    parameterisation: this.parameterisation,
    energy: null,
    applicator: null,
    ssd: null,
    factor: <number> null
  }

  machineExists: boolean = false;
  machineSettingsExist: boolean = false;
  modelExists: boolean = false;

  ableToAddDataToModel: boolean = false;
  dataAlreadyExistsOnModel: boolean = false;

  serverError: boolean = false;

  R50: number;

  constructor(
    private electronApiService: ElectronApiService,
    private dataService: DataService,
    private myTitleService: TitleService,
    private router: Router,
    private modelData: ModelData,
    private currentSettings: CurrentSettings,
    private dataPersistenceService: DataPersistenceService,
  ) { }

  ngOnInit() {
    this.getData();
    this.myTitleService.setTitle('Parameterisation');

    this.parameteriseURL = localStorage.getItem("parameteriseURL")
    if (this.parameteriseURL == null) {
      this.parameteriseURL = 'http://electronapi.simonbiggs.net/parameterise';
    }
    this.machineSpecifications = JSON.parse(localStorage.getItem("specifications"));
    if (this.machineSpecifications == null) {
      this.machineSpecifications = {};
    }
    this.checkMachineSettings()
    this.checkIfCanBeSentToModel()

    this.updateTextAreaValues()
  }

  addMeasuredFactor(factor: number) {
    this.dataAlreadyExistsOnModel = true
    this.ableToAddDataToModel = false

    for (let key of Object.keys(this.currentSettings)) {
      this.currentSettings[key] = this.insertData[key]
    }

    this.dataPersistenceService.loadModelData(this.modelData, this.currentSettings).then(() => {
      this.modelData.model.reset()

      this.modelData.measurement.width.push(Number(this.insertData.parameterisation.width))
      this.modelData.measurement.length.push(Number(this.insertData.parameterisation.length))
      this.modelData.measurement.measuredFactor.push(Number(factor))

      this.dataPersistenceService.saveModelData(this.modelData, this.currentSettings)
    })

    this.dataPersistenceService.saveCurrentSettings(this.currentSettings)
  }

  predictFactor() {
    for (let key of Object.keys(this.currentSettings)) {
      this.currentSettings[key] = this.insertData[key]
    }
    this.dataPersistenceService.saveCurrentSettings(this.currentSettings)

    this.dataPersistenceService.loadModelData(this.modelData, this.currentSettings).then(() => {
      this.modelData.predictions.width.unshift(this.parameterisation.width)
      this.modelData.predictions.length.unshift(this.parameterisation.length)
      if (this.insertData.factor != 0 && this.insertData.factor != null) {
        this.modelData.predictions.measuredFactor.unshift(this.insertData.factor)
      }    

      this.dataPersistenceService.saveModelData(this.modelData, this.currentSettings).then(() => {
        this.router.navigate(["/use-model"])
      })
    })


  }

  updateTextAreaValues() {
    this.textAreaX = String(this.parameterisation.insert.x)
      .replace(/,/g,', ')
    this.textAreaY = String(this.parameterisation.insert.y)
      .replace(/,/g,', ')
  }

  checkIfEqualLengths() {
    if (this.parameterisation.insert.x.length == this.parameterisation.insert.y.length) {
      this.equalLengths = true
    }
    else {
      this.equalLengths = false
    }
  }

  saveInsertData() { 
    this.insertData['parameterisation'] = this.parameterisation
    localStorage.setItem(
      "last_insertData", JSON.stringify(this.insertData))
  }

  validateInput(input: string): boolean {
    // return /^(-?\d*(\.\d+)?[,;\s]+)*-?\d*(\.\d+)?[,;\s]*$/.test(input)
    return /^[-\d\.,;\s]*$/.test(input)
    // return true
  }

  inputTextAreaX(xInput: string) {
    try {
      if (this.validateInput(xInput)) {
        this.parameterisation.insert.x = eval(
          '[' + xInput.replace(/[,;\n\t]\s*/g,', ') + ']')
        this.insertUpdated(this.parameterisation.insert)        
        this.xInputValid = true
        this.checkIfEqualLengths()
        this.saveInsertData()
        this.checkIfCanBeSentToModel()
      }
      else {
        this.xInputValid = false
      }
    }
    catch(err) {
      console.log(err)
      this.xInputValid = false
    }
  }

  inputTextAreaY(yInput: string) {
    try {
      if (this.validateInput(yInput)) {
        this.parameterisation.insert.y = eval(
          '[' + yInput.replace(/[,;\n\t]\s*/g,', ')  + ']')
        this.insertUpdated(this.parameterisation.insert)
        this.yInputValid = true
        this.checkIfEqualLengths()
        this.saveInsertData()
        this.checkIfCanBeSentToModel()
      }
      else {
        this.yInputValid = false
      }
    }
    catch(err) {
      console.log(err)
      this.yInputValid = false
    }
  }


  getData(): void {
    let localStorageInsertDataString = localStorage['last_insertData'];
    
    if (localStorageInsertDataString) {
      this.insertData = JSON.parse(localStorageInsertDataString);
      let insert = this.insertData['parameterisation']['insert']
      this.insertUpdated(insert);
      this.insertData['parameterisation'] = this.parameterisation;
    }
    else {
      // this.loadDemoData();
    }
  }

  loadDemoData(): void {
    let demoData = JSON.parse(JSON.stringify(DEMO_PARAMETERISE_INPUT));
    this.insertUpdated(demoData.insert);
    // this.jsonInputComponent.refresh = true;
    this.insertData =  {
      machine: null,
      parameterisation: this.parameterisation,
      energy: null,
      applicator: null,
      ssd: null,
      factor: null
    }

    this.updateTextAreaValues()
    this.checkIfEqualLengths()
  }

  sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  recursiveServerSubmit() {
    this.serverError = false

    this.electronApiService.sendToServer(
      this.parameteriseURL,
      JSON.stringify(this.parameterisation.insert)
    )
      .then((parameterisationResult: any) => {
        this.parameterisation.circle = parameterisationResult.circle;
        this.parameterisation.ellipse = parameterisationResult.ellipse;
        this.parameterisation.width = parameterisationResult.width;
        this.parameterisation.length = parameterisationResult.length;
        let complete = parameterisationResult.complete;
        if (complete) {
          this.dataInFlight = false;
          this.serverResponseValid = true;
          this.checkSubmitButton()
          localStorage.setItem(
            JSON.stringify(this.parameterisation.insert), 
            JSON.stringify(this.parameterisation)
          );
          this.saveInsertData()
          this.checkIfCanBeSentToModel()
          if (this.parameterisation.width == null) {
            this.serverError = true
          }
        }
        else {
          this.sleep(500).then(() => this.recursiveServerSubmit());
        }
      })
  }

  checkIfCanBeSentToModel() {
    this.ableToAddDataToModel = false;
    this.dataAlreadyExistsOnModel = false;
    if (this.machineSettingsExist) {
      for (let key of Object.keys(this.currentSettings)) {
        this.currentSettings[key] = this.insertData[key]
      }

      this.dataPersistenceService.loadModelData(this.modelData, this.currentSettings).then(() => {
        if (this.modelData == null) {
          this.ableToAddDataToModel = true
        }
        else if (this.modelData.measurement == null) {
          this.ableToAddDataToModel = true
        }
        else {
          if (this.parameterisation.width != null && this.parameterisation.length != null && this.insertData.factor != null) {
            if (
                this.modelData.measurement.width.indexOf(Number(this.parameterisation.width)) > -1 &&
                this.modelData.measurement.length.indexOf(Number(this.parameterisation.length)) > -1 &&
                this.modelData.measurement.measuredFactor.indexOf(Number(this.insertData.factor)) > -1) {
              this.dataAlreadyExistsOnModel = true
            }
            else {
              this.dataAlreadyExistsOnModel = false
              this.ableToAddDataToModel = true
            }
          }
        }
      })


    }
    // console.log(this.ableToAddDataToModel)
  }

  checkMachineSettings() {
    this.R50 = null;
    let machine = this.insertData['machine'];
    let energy = this.insertData['energy'];
    let applicator = this.insertData['applicator'];
    let ssd = this.insertData['ssd'];
    if (this.machineSpecifications[machine]) {
      let specifications = this.machineSpecifications[machine];
      this.R50 = specifications['R50'][energy];
      if (
        specifications['energy'].indexOf(Number(energy)) > -1 && 
        specifications['applicator'].indexOf(String(applicator)) > -1 && 
        specifications['ssd'].indexOf(Number(ssd)) > -1) {
          this.machineSettingsExist = true;
      }
      else {
        this.machineSettingsExist = false;
      }
      this.machineExists = true;
    }
    else {
      this.machineExists = false;
      this.machineSettingsExist = false;
      this.modelExists = false;
    }
  }

  insertDataChange() {
    localStorage.setItem(
      "last_insertData", JSON.stringify(this.insertData)
    );
    this.checkMachineSettings()
    this.checkIfCanBeSentToModel()
  }

  onSubmit() {
    this.dataInFlight = true;
    this.checkSubmitButton();
    this.recursiveServerSubmit();
  }

  insertDataFromLocalStorage(localStorageInsertData: string) {

  }

  parameterisationFromLocalStorage(localStorageParameterisationString: string) {
    let localStorageParameterisation = JSON.parse(localStorageParameterisationString); 
    this.parameterisation.insert = localStorageParameterisation['insert'];
    this.parameterisation.width = localStorageParameterisation['width'];
    this.parameterisation.length = localStorageParameterisation['length'];
    this.parameterisation.circle = localStorageParameterisation['circle'];
    this.parameterisation.ellipse = localStorageParameterisation['ellipse'];
  }

  insertUpdated(insert: any) {
    let localStorageParameterisation = localStorage.getItem(JSON.stringify(insert))
    if (localStorageParameterisation) {
      this.parameterisationFromLocalStorage(localStorageParameterisation);
    }
    else {
      this.parameterisation.insert = insert;
      this.parameterisation.width = null;
      this.parameterisation.length = null;
      this.parameterisation.circle = null;
      this.parameterisation.ellipse = null;
    }
  }

  onJsonStatusChange(jsonStatus: boolean) {
    this.jsonValid = jsonStatus;
    this.checkSubmitButton();
  }

  checkSubmitButton() {
    if (this.dataInFlight || !this.jsonValid ) {
      this.submitDisabled = true;
    }
    else {
      this.submitDisabled = false;
    }
  }

  parameterisationServerChange(serverUrl: string) {
    localStorage.setItem("parameteriseURL", serverUrl);
  }

}
