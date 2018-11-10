
export class volunteer {
    /**
     *
     */
    constructor() {
        this.anotherVehicle = ' ',
            this.area = ' ',
            this.city = ' ',
            this.dateOfBirth = '',
            this.deviceType = '',
            this.driveCode = '',
            this.emailAddres = '',
            this.equipment = '',
            this.firstName = '',
            this.identityNumber = '',
            this.lastName = '',
            this.licenseNumber = '',
            this.mobilePhone = '',
            this.streetAddres = '',
            this.vehicleMake = '',
            this.yourVehicle = '',
            this.permissions = [''],
            this.managerPermissions = [' '],
            this.dispatcherCode = ' '
    }
    anotherVehicle: string;
    area: string;
    city: string;
    dateOfBirth: string;
    deviceType: string;
    driveCode: string;
    emailAddres: string;
    equipment: string;
    fcmToken: string;
    firstName: string;
    identityNumber: string;
    lastName: string;
    licenseNumber: string;
    mobilePhone: string;
    notificationStatus: string;
    notificationStatusTimestamp: string;
    streetAddres: string;
    vehicleMake: string;
    yourVehicle: string;
    permissions: Array<string>;
    managerPermissions:Array<string>;
    dispatcherCode:string;
}