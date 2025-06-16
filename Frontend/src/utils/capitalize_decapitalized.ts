export function capitalizePhrase(str: string) {

    if (typeof str !== "string") return str;
    if (str === "") return str;

    return str.charAt(0).toUpperCase() + str.slice(1);
}


export function decapitalize(str: string) {
    if (typeof str !== "string") return str;
    if (str === "") return str;
    
    return str.charAt(0).toLowerCase() + str.slice(1);
}