export default class MedicalStatus {
    constructor(infection_date, notification_date, quarantined_date) {
        this.infection_date = infection_date
        this.notification_date = notification_date
        this.quarantined_date = quarantined_date
    }
}

export { MedicalStatus }
