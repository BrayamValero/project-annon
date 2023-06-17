// ES6 Modules or TypeScript
import Swal from "sweetalert2"

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

// Sweet Alerts: Options must be an object
export const useSwal = async (options) => {
    return Swal.fire(options)
}
