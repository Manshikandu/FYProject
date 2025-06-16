// src/utils/uploadMedia.js
// export async function uploadMedia(file) {
//   const formData = new FormData();
//   formData.append('file', file); // must match the field name used in multer: 'file'

//   const response = await fetch('/api/media/upload', {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error('Upload failed');
//   }

//   const data = await response.json();
//   return data.url; // Cloudinary file URL
// }


//update version after dyamic connection

// src/components/utils/uploadMedia.js
export async function uploadMedia(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "artist_media"); // from Cloudinary
  formData.append("folder", "media");
  const res = await fetch("https://api.cloudinary.com/v1_1/dq5rjqhnl/image/upload", {
    method: "POST",
    body: formData,
  });

  // if (!res.ok) throw new Error("Upload failed");
  // const data = await res.json();
  // return data.secure_url;
  if (!res.ok) {
    const errorData = await res.json();
    console.error("Cloudinary upload error:", errorData);
    throw new Error("Upload failed");
  }

  const data = await res.json();
  return data.secure_url; // ✅ hosted file URL
}


