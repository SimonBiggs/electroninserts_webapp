// Angular2 imports
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { Title } from '@angular/platform-browser'
import { NgZone } from '@angular/core'
// import {MaterialModule} from '@angular/material'

// Angularitics
import { Angulartics2 } from 'angulartics2'
import { Angulartics2GoogleAnalytics } from 'angulartics2/src/providers/angulartics2-google-analytics'
import { Angulartics2Module } from 'angulartics2'
import { Angulartics2On } from 'angulartics2/src/core/angulartics2On'

// Angular2 Material Design Lite
import { MdlModule } from 'angular2-mdl'

// My router
import { routing } from './app.routing'

// My components
// Root component
import { AppComponent }  from './app.component'
// Bokeh components
import { PlotComponent } from './components/bokeh-components/plot.component'
import { BokehCreateModelComponent } from './components/bokeh-components/bokeh-create-model.component'
import { BokehUseModelComponent } from './components/bokeh-components/bokeh-use-model.component'
// Home components
import { HomeComponent } from './components/home-components/home.component'
// Further details components
 import { FurtherDetailsComponent } from './components/further-details-components/further-details.component'
// Speciation components
import { SpecificationsComponent } from './components/specification-components/specifications.component'
import { ChooseSpecificationsComponent } from './components/model-components/choose-specifications.component'
import { JsonEditComponent } from './components/specification-components/json-edit.component'
// Dicom components
import { DicomComponent } from './components/dicom-components/dicom.component'
import { SendToParameterisationComponent } from './components/dicom-components/send-to-parameterisation.component'
// Parameterise components
import { ParameteriseComponent } from './components/parameterise-components/parameterise.component'
import { WidthLengthTableComponent } from './components/parameterise-components/width-length-table.component'
import { XYInputComponent } from './components/parameterise-components/x-y-input.component'
// Model components
import { WidthLengthAreaInputComponent } from './components/model-components/width-length-area-input.component'
import { CreateModelComponent } from './components/model-components/create-model.component'
import { UseModelComponent } from './components/model-components/use-model.component'
import { InsertTableComponent } from './components/model-components/insert-table.component'
import { CreateInsertTableComponent } from './components/model-components/create-insert-table.component'
// Storage components
import { StorageManagementComponent } from './components/storage-components/storage-management.component'
// Misc components
import { PageNotFoundComponent } from './components/misc-components/page-not-found.component'

// My pipes
// Custom json pipe
import { MyJsonPipe } from './pipes/my-json.pipe'

// My services
// Data services
import { ModelData, ModelMeasurement, ModelGrid, Predictions, AreaLengthConversion } from './services/data-services/model-data'
import { CurrentSettings } from './services/data-services/current-settings'
import { DataPersistenceService } from './services/data-services/data-persistence.service'
import { LocalStorageService } from './services/data-services/local-storage.service'
import { MachineSpecificationsService } from './services/data-services/specifications-data.service'
// Server api services
import { ElectronApiService } from './services/server-api-services/electron-api.service'
// Utility services
import { TitleService } from './services/utility-services/title.service'


@NgModule({
  imports: [
     BrowserModule,
     FormsModule,
     HttpModule,
     MdlModule,
    //  MaterialModule.forRoot(),
     routing,
     Angulartics2Module.forRoot()
  ],
  declarations: [
    AppComponent,
    ParameteriseComponent,
    FurtherDetailsComponent,
    PlotComponent,
    PageNotFoundComponent,
    WidthLengthTableComponent,
    MyJsonPipe,
    HomeComponent,
    CreateModelComponent,
    UseModelComponent,
    StorageManagementComponent,
    SpecificationsComponent,
    DicomComponent,
    SendToParameterisationComponent,
    JsonEditComponent,
    BokehCreateModelComponent,
    BokehUseModelComponent,
    ChooseSpecificationsComponent,
    WidthLengthAreaInputComponent,
    XYInputComponent,
    InsertTableComponent,
    CreateInsertTableComponent
  ],
  providers: [
    ElectronApiService,
    TitleService,
    Title,
    LocalStorageService,
    Angulartics2GoogleAnalytics,
    ModelData, ModelMeasurement, ModelGrid, Predictions, AreaLengthConversion,
    DataPersistenceService,
    CurrentSettings,
    MachineSpecificationsService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
