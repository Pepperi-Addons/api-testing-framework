/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client /*, Request */ } from '@pepperi-addons/debug-server';
import GeneralService from './services/general.service';
import { Subscription } from '@pepperi-addons/papi-sdk';
import { PepperiNotificationServiceService } from './services/pepperi-notification-service.service';
import { ResourceTypes } from './services/general.service';
import { ADALService } from './services/adal.service';

export async function install(client: Client /*, request: Request*/): Promise<any> {
    const generalService = new GeneralService(client);
    const adalService = new ADALService(generalService.papiClient);
    const pepperiNotificationServiceService = new PepperiNotificationServiceService(generalService);
    const PepperiOwnerID = generalService.papiClient['options'].addonUUID;

    //Create Schema With Addon Installation
    // const forDebugSchema =
    await adalService.postSchema({ Name: 'TypeScript Installation Schema' });
    // console.log('postSchema');
    // console.log(JSON.stringify(forDebugSchema));

    //Create Subscription With Addon Installation
    const subscriptionBody: Subscription = {
        AddonRelativeURL: '/logger/update_pns_test',
        Type: 'data',
        AddonUUID: PepperiOwnerID,
        FilterPolicy: {
            Resource: ['transactions' as ResourceTypes],
            Action: ['update'],
            ModifiedFields: ['Remark', 'TaxPercentage', 'ExternalID'],
            AddonUUID: ['00000000-0000-0000-0000-00000000c07e'],
        },
        Name: 'Test_Update_PNS',
    };
    // const forDebugSubs =
    await pepperiNotificationServiceService.subscribe(subscriptionBody);
    // console.log('subscribe');
    // console.log(JSON.stringify(forDebugSubs));
    return { success: true, resultObject: {} };
}

export async function uninstall(/*client: Client, request: Request*/): Promise<any> {
    return { success: true, resultObject: {} };
}

export async function upgrade(/*client: Client, request: Request*/): Promise<any> {
    return { success: true, resultObject: {} };
}

export async function downgrade(/*client: Client, request: Request*/): Promise<any> {
    return { success: true, resultObject: {} };
}
