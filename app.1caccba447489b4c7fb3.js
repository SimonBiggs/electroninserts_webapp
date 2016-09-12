webpackJsonp([0],{0:function(e,t,n){"use strict";var o=n(1),i=n(3),r=n(24);i.enableProdMode(),o.platformBrowserDynamic().bootstrapModule(r.AppModule)},24:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=n(22),s=n(25),l=n(29),c=n(30),p=n(71),d=n(122),u=n(124),h=n(59),f=n(69),m=n(128),y=n(130),g=n(132),v=n(64),b=n(66),C=n(60),R=function(){function AppModule(){}return AppModule=o([r.NgModule({imports:[a.BrowserModule,s.FormsModule,l.HttpModule,p.MdlModule,c.routing],declarations:[d.AppComponent,h.ParameteriseComponent,u.PlotComponent,f.PageNotFoundComponent,m.WidthLengthTableComponent,y.JsonInputComponent,g.MyJsonPipe],providers:[v.ElectronApiService,b.DataService,C.CookieService],bootstrap:[d.AppComponent]}),i("design:paramtypes",[])],AppModule)}();t.AppModule=R},30:function(e,t,n){"use strict";var o=n(31),i=n(59),r=n(69),a=[{path:"parameterise",component:i.ParameteriseComponent},{path:"",redirectTo:"/parameterise",pathMatch:"full"},{path:"**",component:r.PageNotFoundComponent}];t.appRoutingProviders=[],t.routing=o.RouterModule.forRoot(a)},59:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=n(60),s=n(64),l=n(66),c=n(67),p=function(){function ParameteriseComponent(e,t,n){this.electronApiService=e,this.dataService=t,this.cookieService=n,this.parameterisation={insert:{x:[0],y:[0]},width:null,length:null,circle:null,ellipse:null},this.jsonValid=!0,this.dataInFlight=!1}return ParameteriseComponent.prototype.getData=function(){var e=this.cookieService.getObject("parameterisation");e?(this.parameterisation.insert=e.insert,this.parameterisation.width=e.width,this.parameterisation.length=e.length,this.parameterisation.circle=e.circle,this.parameterisation.ellipse=e.ellipse):this.loadDemoData()},ParameteriseComponent.prototype.loadDemoData=function(){this.parameterisation=JSON.parse(JSON.stringify(c.DEMO_PARAMETERISE_INPUT))},ParameteriseComponent.prototype.onSubmit=function(){var e=this;this.dataInFlight=!0,this.electronApiService.parameteriseInsert(JSON.stringify(this.parameterisation.insert)).then(function(t){e.parameterisation.circle=t.circle,e.parameterisation.ellipse=t.ellipse,e.parameterisation.width=t.width,e.parameterisation.length=t.length,e.dataInFlight=!1,e.cookieService.putObject("parameterisation",e.parameterisation)})},ParameteriseComponent.prototype.parseAndCheckJSON=function(e){this.jsonValid=!1;try{var t=JSON.parse(e);if("x"in t&&"y"in t)if(t.x.length===t.y.length){var n=t.x,o=t.y,i={x:n,y:o};this.parameterisation.insert=i,this.jsonValid=!0}else this.jsonErrorMessage="The length of x doesn't match the length of y.";else this.jsonErrorMessage="Either x or y is missing."}catch(r){this.jsonErrorMessage="Error in JSON input. "+r}finally{}},ParameteriseComponent.prototype.ngOnInit=function(){this.getData()},ParameteriseComponent=o([r.Component({selector:"my-parameterise",template:n(68)}),i("design:paramtypes",[s.ElectronApiService,l.DataService,a.CookieService])],ParameteriseComponent)}();t.ParameteriseComponent=p},64:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=n(29);n(65);var s=function(){function ElectronApiService(e){this.http=e,this.parameteriseURL="http://electronapi.simonbiggs.net/parameterise",this.wakeUpURL="http://electronapi.simonbiggs.net/wakeup"}return ElectronApiService.prototype.wakeUpServer=function(){return this.http.get(this.wakeUpURL).toPromise()},ElectronApiService.prototype.parameteriseInsert=function(e){return this.http.post(this.parameteriseURL,e).toPromise().then(function(e){return e.json()})["catch"](this.handleError)},ElectronApiService.prototype.handleError=function(e){return console.error("An error occurred",e),Promise.reject(e.message||e)},ElectronApiService=o([r.Injectable(),i("design:paramtypes",[a.Http])],ElectronApiService)}();t.ElectronApiService=s},66:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=n(67),s=function(){function DataService(){}return DataService.prototype.getParameterisationData=function(){return Promise.resolve(a.DEMO_PARAMETERISE_INPUT)},DataService=o([r.Injectable(),i("design:paramtypes",[])],DataService)}();t.DataService=s},67:function(e,t){"use strict";var n={x:[.99,-.14,-1,-1.73,-2.56,-3.17,-3.49,-3.57,-3.17,-2.52,-1.76,-1.04,-.17,.77,1.63,2.36,2.79,2.91,3.04,3.22,3.34,3.37,3.08,2.54,1.88,1.02,.99],y:[5.05,4.98,4.42,3.24,1.68,.6,-.64,-1.48,-2.38,-3.77,-4.81,-5.26,-5.51,-5.58,-5.23,-4.64,-3.77,-2.77,-1.68,-.29,1.23,2.68,3.8,4.6,5.01,5.08,5.05]};t.DEMO_PARAMETERISE_INPUT={insert:n,circle:null,ellipse:null,width:null,length:null}},68:function(e,t){e.exports='<div class="mdl-grid">\n    Explanation text\n</div>\n<div class="mdl-grid">\n    <div class="mdl-cell mdl-cell--6-col">\n    <my-json-input\n      [insert]="parameterisation.insert"\n      (insertUpdated)="parameterisation.insert=$event">\n    </my-json-input>\n\n    <div [hidden]="jsonValid" class="alert alert-danger">\n      {{jsonErrorMessage}}\n    </div>\n\n    <div class="mdl-grid">\n      <div class="mdl-cell mdl-cell--6-col">\n        <button\n          mdl-button mdl-button-type="raised" \n          mdl-colored="primary" \n          mdl-ripple\n          (click)="loadDemoData()">Load Demo Data            \n        </button>\n        <button\n          mdl-button mdl-button-type="raised" \n          mdl-colored="primary" \n          mdl-ripple\n          [disabled]="dataInFlight"\n          (click)="onSubmit()">Submit            \n        </button>\n      </div>\n      <div class="mdl-cell mdl-cell--6-col">\n        <my-width-length-table\n          [width]="parameterisation.width"\n          [length]="parameterisation.length">\n        </my-width-length-table>\n      </div>\n    </div>\n\n    </div>\n    <div class="mdl-cell mdl-cell--6-col">\n      <my-plot \n        [insert]="parameterisation.insert"\n        [circle]="parameterisation.circle"\n        [ellipse]="parameterisation.ellipse">\n      </my-plot>\n\n    </div>\n</div>\n'},69:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=function(){function PageNotFoundComponent(){}return PageNotFoundComponent=o([r.Component({selector:"my-page-not-found",template:n(70)}),i("design:paramtypes",[])],PageNotFoundComponent)}();t.PageNotFoundComponent=a},70:function(e,t){e.exports="404"},122:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=n(64),s=function(){function AppComponent(e){this.electronApiService=e}return AppComponent.prototype.ngOnInit=function(){this.electronApiService.wakeUpServer()},AppComponent=o([r.Component({selector:"my-app",template:n(123)}),i("design:paramtypes",[a.ElectronApiService])],AppComponent)}();t.AppComponent=s},123:function(e,t){e.exports='<mdl-layout mdl-layout-fixed-drawer mdl-layout-fixed-header>\n  <mdl-layout-header>\n    <mdl-layout-header-row>\n      <mdl-layout-title>Parameterise Inserts</mdl-layout-title>\n    </mdl-layout-header-row>\n  </mdl-layout-header>\n  <mdl-layout-drawer>\n    <mdl-layout-title>Electron Factors</mdl-layout-title>\n    <nav class="mdl-navigation">\n      <a class="mdl-navigation__link" routerLink="/home" routerLinkActive="active" href>Home</a>\n      <a class="mdl-navigation__link" routerLink="/load-save" routerLinkActive="active" href>Load / Save</a>\n      <a class="mdl-navigation__link" routerLink="/specifications" routerLinkActive="active" href>Machine specifications</a>\n      <a class="mdl-navigation__link" routerLink="/dicom" routerLinkActive="active" href>Dicom shape extraction</a>\n      <a class="mdl-navigation__link" routerLink="/parameterise" routerLinkActive="active" href>Parameterise inserts</a>\n      <a class="mdl-navigation__link" routerLink="/model" routerLinkActive="active" href>Model insert factors</a>\n    </nav>\n  </mdl-layout-drawer>\n  <mdl-layout-content>\n    <router-outlet></router-outlet>\n  </mdl-layout-content>\n</mdl-layout>'},124:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=n(125),s=function(){function PlotComponent(){this.jsonValid=!0,this.plt=Bokeh.Plotting,this.tools="pan,crosshair,wheel_zoom,box_zoom,reset,save",this.xrange=Bokeh.Range1d(-6,6),this.yrange=Bokeh.Range1d(-6,6),this.fig=this.plt.figure({title:"Electron Insert Plot",tools:this.tools,plot_width:300,plot_height:300,x_range:this.xrange,y_range:this.yrange}),this.source=new Bokeh.ColumnDataSource,this.doc=new Bokeh.Document}return PlotComponent.prototype.ngOnChanges=function(){this.jsonValid=!1,this.tempSource={xs:[[0],[0],[0]],ys:[[0],[0],[0]],colour:["navy","firebrick","green"]},this.insert&&"x"in this.insert&&"y"in this.insert&&(this.tempSource.xs[0]=this.insert.x,this.tempSource.ys[0]=this.insert.y),this.circle&&"x"in this.circle&&"y"in this.circle&&(this.tempSource.xs[1]=this.circle.x,this.tempSource.ys[1]=this.circle.y),this.ellipse&&"x"in this.ellipse&&"y"in this.ellipse&&(this.tempSource.xs[2]=this.ellipse.x,this.tempSource.ys[2]=this.ellipse.y),this.source.data=this.tempSource},PlotComponent.prototype.ngAfterViewInit=function(){this.ngOnChanges(),this.fig.multi_line({field:"xs"},{field:"ys"},{source:this.source,line_width:2,color:{field:"colour"}}),this.doc.add_root(this.fig),Bokeh.embed.add_document_standalone(this.doc,this.bokehplot.nativeElement)},o([r.Input(),i("design:type",a.Coordinates)],PlotComponent.prototype,"insert",void 0),o([r.Input(),i("design:type",a.Coordinates)],PlotComponent.prototype,"circle",void 0),o([r.Input(),i("design:type",a.Coordinates)],PlotComponent.prototype,"ellipse",void 0),o([r.ViewChild("bokehplot"),i("design:type",Object)],PlotComponent.prototype,"bokehplot",void 0),PlotComponent=o([r.Component({selector:"my-plot",template:n(126),styles:[n(127)]}),i("design:paramtypes",[])],PlotComponent)}();t.PlotComponent=s},125:function(e,t){"use strict";var n=function(){function Coordinates(e,t){this.x=e,this.y=t}return Coordinates}();t.Coordinates=n},126:function(e,t){e.exports='\n  <div class="bk-root" style="height:300px">\n    <div #bokehplot></div>\n  </div>\n\n\n  <div [hidden]="jsonValid" class="alert alert-danger">\n      {{jsonErrorMessage}}\n  </div>\n'},127:function(e,t){e.exports=""},128:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=n(71),s=function(){function WidthLengthTableComponent(){this.tableData=[{width:null,length:null}],this.tableModel=new a.MdlDefaultTableModel([{key:"width",name:"Width",sortable:!0,numeric:!0},{key:"length",name:"Length",sortable:!0,numeric:!0}])}return WidthLengthTableComponent.prototype.ngOnChanges=function(){this.tableData[0].width=this.width,this.tableData[0].length=this.length},WidthLengthTableComponent.prototype.ngOnInit=function(){this.tableModel.addAll(this.tableData)},o([r.Input(),i("design:type",Number)],WidthLengthTableComponent.prototype,"width",void 0),o([r.Input(),i("design:type",Number)],WidthLengthTableComponent.prototype,"length",void 0),WidthLengthTableComponent=o([r.Component({selector:"my-width-length-table",template:n(129)}),i("design:paramtypes",[])],WidthLengthTableComponent)}();t.WidthLengthTableComponent=s},129:function(e,t){e.exports='<mdl-table mdl-shadow="2"\n  [table-model]="tableModel">\n</mdl-table>'},130:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=n(125),s=function(){function JsonInputComponent(){this.insertUpdated=new r.EventEmitter,this.jsonValid=!0}return JsonInputComponent.prototype.onInput=function(e){this.parseAndCheckJSON(e),this.insertUpdated.emit(this.insert)},JsonInputComponent.prototype.parseAndCheckJSON=function(e){this.jsonValid=!1;try{var t=JSON.parse(e);if("x"in t&&"y"in t)if(t.x.length===t.y.length){var n=t.x,o=t.y,i={x:n,y:o};this.insert=i,this.jsonValid=!0}else this.jsonErrorMessage="The length of x doesn't match the length of y.";else this.jsonErrorMessage="Either x or y is missing."}catch(r){this.jsonErrorMessage="Error in JSON input. "+r}finally{}},o([r.Input(),i("design:type",a.Coordinates)],JsonInputComponent.prototype,"insert",void 0),o([r.Output(),i("design:type",Object)],JsonInputComponent.prototype,"insertUpdated",void 0),JsonInputComponent=o([r.Component({selector:"my-json-input",template:n(131)}),i("design:paramtypes",[])],JsonInputComponent)}();t.JsonInputComponent=s},131:function(e,t){e.exports='<mdl-textfield \n  [value]="insert | myJson"\n  (input)="onInput($event.target.value)"\n  rows="13" maxrows="13" \n  style="width:100%">\n</mdl-textfield>\n<div [hidden]="jsonValid">\n  {{jsonErrorMessage}}\n</div>'},132:function(e,t,n){"use strict";var o=this&&this.__decorate||function(e,t,n,o){var i,r=arguments.length,a=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(a=(r<3?i(a):r>3?i(t,n,a):i(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},i=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},r=n(3),a=function(){function MyJsonPipe(){}return MyJsonPipe.prototype.transform=function(e){var t=JSON.stringify(e);return t=t.replace(/,/g,", ")},MyJsonPipe=o([r.Pipe({name:"myJson",pure:!1}),i("design:paramtypes",[])],MyJsonPipe)}();t.MyJsonPipe=a}});
//# sourceMappingURL=app.1caccba447489b4c7fb3.js.map