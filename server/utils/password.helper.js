import bcrypt from "bcryptjs"
class PasswordHelper{
    static async hashPassword(password){
        const salt = 12
        const hashedPassword = await bcrypt.hash(password,salt)
        return hashedPassword
    }
}

export default PasswordHelper