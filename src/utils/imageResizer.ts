import Resizer from "react-image-file-resizer";
const resizeFile = (file:File) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			300,
			300,
			"JPEG",
			100,
			0,
			(uri) => {
				resolve(uri);
			},
			"blob"
		);
	});

export default resizeFile
