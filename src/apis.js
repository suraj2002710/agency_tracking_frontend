
function getBaseUrl() {
    const environment = process.env.REACT_APP_ENVIRONMENT || "local";
    try{
    switch (environment) {
        case 'production':
            return process.env.REACT_APP_PRODUCTION_API_URL;
        case 'staging':
            return process.env.REACT_APP_STAGING_API_URL;
        case 'local':
            return process.env.REACT_APP_LOCAL_API_URL || "http://127.0.0.1:4000/";
        default:
            throw new Error(`Invalid environment: ${environment}`);
    }}
    catch(err){
        console.log(err)
    }
}
export const baseurl = getBaseUrl()
console.log(baseurl, 'basee')

export const apis = {
    // Auth
    LOGIN_API:`${baseurl}api/user/login`,
    GET_SINGLE_USER:`${baseurl}api/user/get-single-user`,


    // Caregiver
    GET_CAREGIVER:`${baseurl}api/caregiver/fetch-all`,

    // Punch
    GET_PUNCHS:`${baseurl}api/punch/fetch-all`,
    CREATE_PUNCHS:`${baseurl}api/caregiver/punch`,
    GET_SINGLE_PUNCHS:`${baseurl}api/punch/single-fetch`,
    UPDATE_PUNCHS:`${baseurl}api/punch/update`,

    //agency
    GET_AGENCY:`${baseurl}api/agency/fetch-all`,
    GET_FACILITY:`${baseurl}api/facility/fetch-all`,

    // Get all Patients

    GET_PATIENTS:`${baseurl}api/patient/fetch-all`,
    GET_PATIENTS_CONTACT:`${baseurl}api/patient/patient_contact/fetch/`,
    GET_ALL_PATIENTS_CONTACT:`${baseurl}api/patient/patient_contact/fetch-all/`,
    GET_ALL_GROUPS:`${baseurl}api/message/group-fetch-all`,
    CREATE_GROUPS:`${baseurl}api/message/group-create`,
    CREATE_MESSAGES:`${baseurl}api/message/create`,
    GET_MESSAGES:`${baseurl}api/message/fetch`,

    GET_ALL_CHATS:`${baseurl}api/message/get-all-chats`,
    GET_ALL_UNKNOWN_CONTACT:`${baseurl}api/patient/get-unknown-contact`,
    FETCH_NEW_MESSAGES:`${baseurl}api/message/fetch-new-messages`,
    READ_MSG:`${baseurl}api/message/msg-read`,

    // Facilities
    FACILITY_CREATE:`${baseurl}api/facility/create`,



}