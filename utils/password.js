import bcrypt from 'bcrypt'

export const hashPassword = async(plainPassword) => {
    return await bcrypt.hash(plainPassword, 10)
}

export const comaparePassword = (plainPassword , hashedPassword)=>{
    return  bcrypt.compare(plainPassword, hashedPassword)
}