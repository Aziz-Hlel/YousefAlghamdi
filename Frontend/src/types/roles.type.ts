
const USER = "client";
const CLIENT = "client";
const AGENT = "agent";
const ADMIN = "admin";


export type RoleType = typeof USER | typeof CLIENT | typeof AGENT | typeof ADMIN;

export const roles: { USER: "client", CLIENT: "client", AGENT: "agent", ADMIN: "admin" } = {

    USER,
    CLIENT,
    AGENT,
    ADMIN,

}




export default roles;


