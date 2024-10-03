import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTitle = ({ title }:{title:string}) => {
	const location = useLocation();

	useEffect(() => {
		if(typeof window !== "undefined") {
			document.title = title;
		}
	}, [location, title]);

	return null;
};

export default PageTitle;
