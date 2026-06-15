import cloudinary from "../config/cloudinaryConfig.mjs";

export async function uploadImage(buffer, folder) {

    return new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream(
            {
                folder
            },
            (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(buffer);

    });
}