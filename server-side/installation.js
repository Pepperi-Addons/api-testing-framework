
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The erroeMessage is importent! it will be written in the audit log and help the user to understand what happen
*/

// import { Client, Request } from '@pepperi-addons/debug-server';
import GeneralService from './services/general.service';
import { ADALService } from './services/adal.service';


exports.install = async (Client, Request) => {
    const generalService = new GeneralService(Client);
    const adalService = new ADALService(generalService.papiClient);
    // const createNewSchema =
    await adalService.postSchema({ Name: 'JavaScript Installation Schema' });
    return {success:true}
}
exports.uninstall = async (Client, Request) => {
    return {success:true}
}
exports.upgrade = async (Client, Request) => {
    return {success:true}
}
exports.downgrade = async (Client, Request) => {
    return {success:true}
}