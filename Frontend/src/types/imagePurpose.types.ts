
const property = "property";
const profile = "profile";
const sponsor = "sponsor";


const PROPERTY: typeof property = property;
const PROFILE: typeof profile = profile;
const SPONSOR: typeof sponsor = sponsor;



export type ImagePurposeType = typeof PROPERTY | typeof PROFILE | typeof SPONSOR



export const imagePurposes = {
    PROPERTY,
    PROFILE,
    SPONSOR
}









