// ES6 Modules or TypeScript
import Swal from "sweetalert2"
import jwt_decode from "jwt-decode"

const ADMIN = import.meta.env.VITE_ADMIN_NAME
const MODERATOR = import.meta.env.VITE_MODERATOR_NAME
const GUEST = import.meta.env.VITE_GUEST_NAME

export const useAbilities = {
    // Users
    "add-user": [ADMIN, MODERATOR],
    "edit-user": [ADMIN, MODERATOR],
    "edit-password": [ADMIN],
    "delete-user": [ADMIN],
    // Folders
    "add-folder": [ADMIN, MODERATOR],
    "edit-folder": [ADMIN, MODERATOR],
    "delete-folder": [ADMIN],
    // Files
    "upload-file": [ADMIN, MODERATOR],
    "delete-file": [ADMIN],
    "download-files": [ADMIN],
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
