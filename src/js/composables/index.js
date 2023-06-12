export const useVerifyForm = (obj) => {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key]

            if (value === null || value.trim() === "") {
                alert("Verifica los campos")
                return false
            }
        }
    }

    return true
}
