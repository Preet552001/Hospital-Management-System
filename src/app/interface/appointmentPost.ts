export interface AppointmentPost{
    appointmentId:number;
    patientId:number;
    physicianId:number;
    onCallId:number;
    startDateTime:string;
    endDateTime:string;
}