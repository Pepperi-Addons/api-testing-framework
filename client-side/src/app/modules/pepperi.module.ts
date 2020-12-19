import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    PepIconModule,
    PepIconRegistry,
    pepIconSystemBolt,
    pepIconNoImage,
} from "@pepperi-addons/ngx-lib/icon";
import {
    PepNgxLibModule,
    AddonService,
    CustomizationService,
    FileService,
} from "@pepperi-addons/ngx-lib";
import { PepAttachmentModule } from "@pepperi-addons/ngx-lib/attachment";
import { PepCheckboxModule } from "@pepperi-addons/ngx-lib/checkbox";

import { PepFilesUploaderModule } from "@pepperi-addons/ngx-lib/files-uploader";
import { PepColorModule } from "@pepperi-addons/ngx-lib/color";
import { PepDateModule } from "@pepperi-addons/ngx-lib/date";
import { PepImageModule } from "@pepperi-addons/ngx-lib/image";
import { PepImagesFilmstripModule } from "@pepperi-addons/ngx-lib/images-filmstrip";
// import { PepInternalButtonModule } from "@pepperi-addons/ngx-lib/internal-button";
// import { PepMenuModule } from "@pepperi-addons/ngx-lib/menu";
import { PepQuantitySelectorModule } from "@pepperi-addons/ngx-lib/quantity-selector";
import { PepRichHtmlTextareaModule } from "@pepperi-addons/ngx-lib/rich-html-textarea";
import { PepSelectModule } from "@pepperi-addons/ngx-lib/select";
import { PepSeparatorModule } from "@pepperi-addons/ngx-lib/separator";
import { PepSignatureModule } from "@pepperi-addons/ngx-lib/signature";
import { PepSizeDetectorModule } from "@pepperi-addons/ngx-lib/size-detector";
import { PepTextareaModule } from "@pepperi-addons/ngx-lib/textarea";
import { PepTextboxModule } from "@pepperi-addons/ngx-lib/textbox";
import { PepListModule } from "@pepperi-addons/ngx-lib/list";
import { HttpClient } from "@angular/common/http";
import {
    TranslateModule,
    TranslateLoader,
    TranslateService,
} from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";

export function createTranslateLoader(
    http: HttpClient,
    fileService: FileService,
    addonService: AddonService
) {
    let addonStaticFolder = addonService.getAddonStaticFolder();
    addonStaticFolder =
        window.location.href.includes("localhost") ||
        addonStaticFolder.includes("localhost")
            ? ""
            : addonStaticFolder;
    const translationsPath: string = fileService.getAssetsTranslationsPath();
    const translationsSuffix: string = fileService.getAssetsTranslationsSuffix();

    return new MultiTranslateHttpLoader(http, [
        {
            prefix:
                addonStaticFolder.length > 0
                    ? addonStaticFolder
                    : translationsPath,
            suffix: translationsSuffix,
        },
        {
            prefix:
                addonStaticFolder.length > 0
                    ? addonStaticFolder
                    : "/assets/i18n/",
            suffix: ".json",
        },
    ]);
}

const pepperiComponentsModules = [
    PepAttachmentModule,
    PepCheckboxModule,
    PepColorModule,
    PepDateModule,
    PepImageModule,
    PepImagesFilmstripModule,
    PepListModule,
    PepCheckboxModule,
    //   PepInternalButtonModule,
    //   PepMenuModule,
    PepQuantitySelectorModule,
    PepRichHtmlTextareaModule,
    PepSelectModule,
    PepSeparatorModule,
    PepSignatureModule,
    PepSizeDetectorModule,
    PepTextareaModule,
    PepTextboxModule,
    PepIconModule,
    PepFilesUploaderModule,
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        PepNgxLibModule,
        pepperiComponentsModules,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient, FileService, AddonService],
            },
        }),
    ],
    exports: [PepNgxLibModule, pepperiComponentsModules],
})
export class PepUIModule {
    constructor(
        translate: TranslateService,
        private pepperiIconRegistry: PepIconRegistry
    ) {
        this.pepperiIconRegistry.registerIcons([
            pepIconSystemBolt,
            pepIconNoImage,
        ]);

        let userLang = "en";
        translate.setDefaultLang(userLang);
        userLang = translate.getBrowserLang().split("-")[0]; // use navigator lang if available

        if (location.href.indexOf("userLang=en") > -1) {
            userLang = "en";
        }

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use(userLang).subscribe((res: any) => {
            // In here you can put the code you want. At this point the lang will be loaded
        });
    }
}
