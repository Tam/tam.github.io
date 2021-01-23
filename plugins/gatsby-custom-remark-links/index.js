const visit = require('unist-util-visit')
	, path = require('path');

module.exports = ({ markdownAST, files, getNode, markdownNode }) => {
	const markdownDirectory = getNode(markdownNode.parent).dir;

	visit(markdownAST, 'link', node => {
		if (node.url.indexOf('://') > -1 || node.url.indexOf('.md') === -1)
			return;

		const absPath = path.join(markdownDirectory, node.url);

		const file = files.find((file) => {
			return file && file.absolutePath ? file.absolutePath === absPath : false
		});

		if (file)
			node.url = file.relativePath;

		node.url = node.url.replace(/(\/index)?.md$/, '');
	});

	return markdownAST;
};
