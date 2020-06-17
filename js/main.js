import { getRandColor } from '../packages/mini-map/util';
import * as CONS from '../packages/mini-map/constant';
import { dispatch } from '../packages/mini-map/lib/ux';
import miniMap from '../packages/mini-map';

import parser from './parser';
import { detectCanvasContentSize } from './canvasUtils.js';


const render = (el, root) => dispatch('INIT_STATE', { el, root });

const INIT_TEXT = `Thema
 Medien
  

 Familie & Freunde
  

 Religion
  

 Bildung
  

 Gesellschaft
  

 Politik / Staat
  

 Wirtschaft
  `;

const DATA = {
	text:   localStorage.getItem('mind_map_text') || INIT_TEXT,
	struct: CONS.MAP,
};

const mindMap = document.getElementById('mind-map');
const textArea = document.getElementById('text-area');
const downloadButton = document.getElementById('download-button');

const renderMindMap = () => {
	const root = parser(DATA.text);
	root.struct = DATA.struct;
	render(mindMap, root);
};

textArea.timeout = null;
textArea.addEventListener('input', (e) => {
	clearTimeout(textArea.timeout);

	textArea.timeout = setTimeout(() => {
		DATA.text = textArea.value;
		localStorage.setItem('mind_map_text', textArea.value);
		renderMindMap();
	}, 1000);
});

const getMindMapSize = (image) => {
	const canvas = document.createElement('canvas');

	canvas.width = 10000;
	canvas.height = 10000;

	const context = canvas.getContext('2d');

	context.drawImage(image, 0, 0, 10000, 10000);

	return detectCanvasContentSize(context);
};

downloadButton.addEventListener('click', (e) => {
	if (textArea.value.trim() === '') return;

	const svgElement = document.querySelector('#mind-map > svg');
	const xml = new XMLSerializer().serializeToString(svgElement);

	const imageSrc = 'data:image/svg+xml;base64,' + btoa(xml);

	const image = new Image();

	image.onload = () => {
		const {width, height} = getMindMapSize(image);

		const canvas = document.createElement('canvas');

		canvas.height = height + 20;
		canvas.width = width + 20;

		const context = canvas.getContext('2d');

		context.drawImage(image, 0, 0, 10000, 10000);

		const png = canvas.toDataURL();
		const link = document.createElement('a');

		link.download = 'mindmap.png';
		link.style.opacity = '0';

		document.body.appendChild(link);

		link.href = png;
		link.click();
		link.remove();
	};

	image.onerror = (...args) => console.error(args);

	image.src = imageSrc;
});

textArea.value = DATA.text;
renderMindMap();
