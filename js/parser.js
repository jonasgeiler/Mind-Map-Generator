let COUNT = 0;
const uuid = () => ++COUNT;

const TOPIC_REG = /^(\s+)(.*)$/;
const getTopic = (line) => {
	const match = TOPIC_REG.exec(line);

	if (match === null) {
		return null;
	} else {
		const title = match[2];
		const depth = match[1].length;
		return { id: uuid(), text: { content: title }, children: [], depth };
	}
};

export default (str) => {
	const lines = str.split('\n').filter((l) => l.trim() !== '');
	const root = { id: uuid(), text: { content: lines[0] }, children: [], depth: 0 };
	const exps = lines.slice(1).map(getTopic).filter((exp) => exp);

	const iter = (i, ctx) => {
		while (true) {
			if (i === exps.length) {
				return i;
			}
			const exp = exps[i];
			if (exp.depth <= ctx.depth) {
				return i;
			} else {
				ctx.children.push(exp);
				i = iter(i + 1, exp);
			}
		}
	};

	COUNT = 0;   // init COUNT to keep idempotent
	iter(0, root);
	return root;
}
