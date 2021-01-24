import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewEncapsulation,
  Compiler,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Router, ActivatedRoute } from "@angular/router";
import { PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { ExperimentService } from './experiment.service';


@Component({
  selector: 'experiment-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.scss'],
  providers: [ExperimentService]
})
export class ExperimentComponent implements OnInit {
  screenSize: PepScreenSizeType;
  data: any;
  apiEndpoint: string;
  selectSize: number;
  selectedColor: string;

  constructor(
    public pluginService: ExperimentService,
    private translate: TranslateService,
    public routeParams: ActivatedRoute,
    public router: Router,
    public compiler: Compiler,
    public layoutService: PepLayoutService,
  ) {

    // Parameters sent from url
    this.pluginService.pluginUUID = this.routeParams.snapshot.params['experiment_uuid'];
    let userLang = "en";
    translate.setDefaultLang(userLang);
    userLang = translate.getBrowserLang().split("-")[0]; // use navigator lang if available
    translate.use(userLang);
    this.layoutService.onResize$.subscribe(size => {
      this.screenSize = size;
    });
  }

  ngOnInit(): void {
  }

  testEndpoint(endpoint, successFunc = null, errorFunc = null) {
    const self = this;
    this.pluginService.getApiEndpoint(`/tests/${endpoint}`).subscribe(
      (res: any) => {

        if (successFunc) {
          successFunc(res);
        }
        else {
          self.data = res;
          //self.userService.setShowLoading(false)
        }
      },
      (error) => {
        if (errorFunc) {
          errorFunc(error);
        }
      },
      //() => self.userService.setShowLoading(false)
    )
  }

  getExecutionLog(executionUUID, successFunc, errorFunc = null) {
    let url = "/audit_logs?where=(UUID='" + executionUUID + "')";
    this.pluginService.get(url).subscribe(
      res => {
        if (successFunc) {
          successFunc(res);
        }
      },
      (error) => {
        if (errorFunc) {
          errorFunc(error);
        }
      },
      //() => this.userService.setShowLoading(false)
    )
  }

  pollExecution(endpoint, pollingInterval = 6000,
    stopConditionFunction = (res) => { return res.length > 0 && (res[0].Status.Name === 'Failure' || res[0].Status.Name === 'Success') }) {
    //res[0].AuditInfo.ResultObject
    this.testEndpoint(endpoint, jobRes => {
      let self = this;
      const interval = window.setInterval(() => {
        this.getExecutionLog(jobRes.ExecutionUUID,
          logRes => {
            if (stopConditionFunction(logRes)) {
              //debugger;
              if (logRes[0].Status.Name === 'Success') {
                self.data = JSON.parse(logRes[0].AuditInfo.ResultObject);
              }
              else {
                alert("Test failed. The status = Failure!!!");
              }
              window.clearInterval(interval);
              //this.userService.setShowLoading(false);
            }

          },
          () => {
            window.clearInterval(interval);
            // this.userService.setShowLoading(false);
          }
        );

      }, pollingInterval);
    });
  }

  getTestsList() {
    this.data = this.pluginService.getTestsList();
  }

  testSyncEndpoint(endpoint, successFunc = null, errorFunc = null) {
    const self = this;
    this.pluginService.getApiEndpoint(`/tests/${endpoint}`, true).subscribe(
      (res: any) => {

        if (successFunc) {
          successFunc(res);
        }
        else {
          self.data = res;
          // self.userService.setShowLoading(false)
        }
      },
      (error) => {
        if (errorFunc) {
          errorFunc(error);
        }
      },
      //() => self.userService.setShowLoading(false)
    )
  }
  changeColor() {
    document.getElementById("addon-header").style.boxShadow = "inset 0 -8px 5px -6px red";
  }
  //    document.getElementById("addon-header").style.boxShadow = "inset 0 -8px 5px -6px var(--shadow-smoke)";

  setSlidervalue(event: any) {
    this[event.source._elementRef.nativeElement.attributes.valvar.nodeValue] = event.value;
    this.setColor();
  }

  setColor() {
    this.selectedColor = (<HTMLInputElement>document.getElementById("selectedColor")).value;
    switch (this.selectSize) {
      case -8:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 -8px 5px -4px inset`;
        break;
      case -7:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 -8px 5px -5px inset`;
        break;
      case -6:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 -8px 5px -6px inset`;
        break;
      case -5:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 -8px 5px -7px inset`;
        break;
      case -4:
      case -3:
      case -2:
      case -1:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 -8px 5px -8px inset`;
        break;
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 4px 5px -4px`;
        break;
      case 5:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 5px 5px -4px`;
        break;
      case 6:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 6px 5px -4px`;
        break;
      case 7:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 7px 5px -4px`;
        break;
      case 8:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 8px 5px -4px`;
        break;
      default:
        document.getElementById("addon-header").style.boxShadow = `${this.selectedColor} 0 -8px 5px -6px inset`;
        break;
    }
  }
}
