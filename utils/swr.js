import {SWRConfig} from 'swr';

const options = {
	onErrorRetry: (error, key, config, revalidate, {retryCount}) => {
		if (error.response.status === 404 || error.response.status === 401) return;
		if (retryCount >= 10) return;
		revalidate({retryCount: retryCount + 1});
	}
};

function GlobalSWRConfig({children}) {
	return <SWRConfig value={options}>{children}</SWRConfig>;
}

export default GlobalSWRConfig;
