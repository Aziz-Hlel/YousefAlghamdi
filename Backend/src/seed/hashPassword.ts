import bcrypt from "bcrypt";


const hashPassword = async (password:string) => {
    return await bcrypt.genSalt(10);
}

export default hashPassword