
export const emailRegex = (email: string) => {
    const regex =  new RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
    return regex.test(email)
}