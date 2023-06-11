export const useVerifyForm = (formData) => {
    for (let [key, value] of formData.entries()) {
        console.log(key, value)
        if (key !== "files[]") {
            if (value === null || value.trim() === "") {
                alert("Verifica los campos")
                return false
            }
        }
    }

    return true
}
