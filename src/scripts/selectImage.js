export const selectImage = () => {
    return new Promise((resolve, reject) => {
        // Create an invisible file input
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*"; // Only images

        input.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            reject("No image selected");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const base64Image = reader.result;
            localStorage.setItem("selectedImage", base64Image); // Store in localStorage
            console.log("Image selected and stored successfully");
            resolve(base64Image); // Return the image data
        };

        reader.onerror = () => {
            reject("Failed to read the image file");
        };

        reader.readAsDataURL(file); // Convert to base64
        };

        input.click(); // Trigger file selection
    });
};