const multer = require("multer");//importation package multer


//genère l'extension du fichier
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//objet de configuration pr multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {//ou les fichiers sont enregistrés
    callback(null, "images");//appeler la fonction tt de suite
  },
  filename: (req, file, callback) => {//explik a multer kel nom de fichier utilisé
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");//appeler multer qui sera configuré
