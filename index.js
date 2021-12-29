/*
**  Copied directly from
**  https://github.com/withastro/astro/blob/faf0b9aa8b281a98457399f78e061c6bb9b6b78e/packages/markdown/remark/src/remark-slug.ts
*/

import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import BananaSlug from 'github-slugger';

const slugs = new BananaSlug();

export default function remarkSlug() {
	return (tree) => {
		slugs.reset();
		visit(tree, 'heading', (node) => {
			const data = node.data || (node.data = {});
			const props = data.hProperties || (data.hProperties = {});
			let id = props.id;
			id = id ? slugs.slug(String(id), true) : slugs.slug(toString(node));
			data.id = id;
			props.id = id;
		});
	};
}