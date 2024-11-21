import {createHmac} from "crypto"

class VerificationCodeService{

    static hmacProccess(value,key){
        const result = createHmac("sha256",key).update(value).digest("hex")
        return result
    }
}

export default VerificationCodeService