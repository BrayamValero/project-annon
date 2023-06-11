export const useVerifyForm = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key]
            if (
                value === null ||
                value === "" ||
                (typeof value === "string" && value.trim() === "")
            ) {
                alert("Por favor, llena todos los campos")
                return false
            }
        }
    }
    return true
}
