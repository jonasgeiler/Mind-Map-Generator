import { getRandColor } from '../packages/mini-map/util';
import * as CONS from '../packages/mini-map/constant';
import { dispatch } from '../packages/mini-map/lib/ux';
import miniMap from '../packages/mini-map';

import parser from './parser';


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


textArea.value = DATA.text;
renderMindMap();
