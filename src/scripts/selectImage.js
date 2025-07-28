export default function selectImage() {
  return new Promise(function (resolve, reject) {
    // Create a hidden file input element
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".jpeg,.jpg,.png";

    input.onchange = function (event) {
      const file = event.target.files && event.target.files[0];

      if (!file) {
        reject("No image selected.");
        return;
      }

      // Validate file type
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        reject("Invalid file type. Only JPEG, JPG, or PNG allowed.");
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        reject("File size exceeds 5MB.");
        return;
      }

      // Return raw File object
      resolve(file);
    };

    input.click(); // Open file dialog
  });
}
