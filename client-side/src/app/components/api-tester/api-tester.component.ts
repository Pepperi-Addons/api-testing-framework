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
import { ApiTesterService } from './api-tester.service';


@Component({
  selector: 'api-tester-api-tester',
  templateUrl: './api-tester.component.html',
  styleUrls: ['./api-tester.component.scss'],
  providers: [ApiTesterService]
})
export class ApiTesterComponent implements OnInit {
    screenSize: PepScreenSizeType;
    data: any;
    apiEndpoint: string;

    constructor(
        public pluginService: ApiTesterService,
        private translate: TranslateService,
        public routeParams: ActivatedRoute,
        public router: Router,
        public compiler: Compiler,
        public layoutService: PepLayoutService,
    ) {

        // Parameters sent from url
        this.pluginService.pluginUUID = this.routeParams.snapshot.params['api-tester_uuid'];
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
}
