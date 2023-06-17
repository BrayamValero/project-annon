// ES6 Modules or TypeScript
import Swal from "sweetalert2"
import jwt_decode from "jwt-decode"

export const useAbilities = {
    // Users
    "add-user": ["admin"],
    "edit-user": ["admin"],
    "edit-password": ["admin"],
    "delete-user": ["admin"],
    // Folders
    "add-folder": ["admin"],
    "edit-folder": ["admin"],
    "delete-folder": ["admin"],
    // Files
    "upload-file": ["admin"],
    "delete-file": ["admin"],
}

export const useVerifyForm = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key]
            if (
                value === null ||
                value === "" ||
                (typeof value === "string" && value.trim() === "")
            ) {
                Swal.fire(
                    "Whoops!",
                    "Por favor, llena todos los campos",
                    "warning"
                )
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

// Sweet Alerts: Options must be an object
export const useDecodeJWT = (token) => jwt_decode(token)
