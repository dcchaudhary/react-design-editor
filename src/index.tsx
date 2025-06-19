import { ConfigProvider } from 'antd';
import enUS from 'antd/locale/en_US';
import koKR from 'antd/locale/ko_KR';
import i18next from 'i18next';
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { i18nClient } from './i18n';
import { register } from './serviceWorker';
import { createRoot } from 'react-dom/client';

const antResources = {
	ko: koKR,
	'ko-KR': koKR,
	en: enUS,
	'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const rootElement = document.getElementById('root');

const render = (Component: React.ElementType) => {
	const root = createRoot(rootElement!);
	root.render(
		<ConfigProvider locale={antResources[i18next.language]}>
			<Component />
		</ConfigProvider>
	);
};

i18nClient();

render(App);

register();
