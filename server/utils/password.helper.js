import bcrypt from "bcryptjs"
class PasswordHelper{
    static async hashPassword(password){
        const salt = 12
        const hashedPassword = await bcrypt.hash(password,salt)
        return hashedPassword
    }
    static async comparePassword(password,hashedPassword){
        const isMatch = await bcrypt.compare(password,hashedPassword)
        return isMatch
    }
}

export default PasswordHelper