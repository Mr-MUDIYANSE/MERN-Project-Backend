import GalleryItem from "../model/galleryItem.js";
export function getGalleryItem(req, res) {
    GalleryItem.find().then(
        (list) => {
            res.json({
                list: list
            });
        }
    )
}
export function createGalleryItem(req, res) {

    const user = req.user;

    if (!user) {
       return res.status(403).json({
            message: "Please login to create a new gallery",
        });
    }

    if (user.type != 'admin') {
        return res.status(401).json({
            message: "Access denied",
        });
    }

    const galleryItem = req.body.item;
    const newGalleryItem = GalleryItem(galleryItem);

    newGalleryItem.save().then(
        () => {
            res.json({
                message: "Gallery item added successfully"
            });
        }
    ).catch(
        () => {
            res.status(500).json({
                message: "Gallery item failed to be saved"
            });
        }
    )
}