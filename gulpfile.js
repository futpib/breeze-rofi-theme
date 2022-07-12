
const gulp = require('gulp');
const transform = require('gulp-transform');
const rename = require('gulp-rename');
const fs = require('fs/promises');

const {
	pipe,
	toPairs,
	map,
	join,
	curry,
	fromPairs,
	adjust,
	split,
	last,
	filter,
	prop,
	keys,
	mapObjIndexed,
	difference,
	replace,
} = require('ramda');

const ini = require('ini');

const color = require('color');

const postcss = require('postcss');

const mapping = require('./mapping');

const mapKeys = curry((fn, obj) => fromPairs(map(adjust(0, fn), toPairs(obj))));

const hex = x => {
	if (x && /^\d+,\d+,\d+$/.test(x)) {
		x = color(x.split(',').map(x => parseInt(x, 10)));
	}
	return x.hex ?
		x.hex() :
		x;
};

const alpha = (c, a) => hex(color(c).alpha(typeof a === 'number' ? a : (parseInt(a, 16) / 255)));

const mix = (a, b, r) => hex(color(a).mix(color(b), r));

const overlay = (bg, fg) => {
	const { color: [ bgr, bgg, bgb ], valpha: bga } = color(bg);
	const { color: [ fgr, fgg, fgb ], valpha: fga } = color(fg);

	const a = bga + fga - (bga * fga);

	const r = ((fgr * fga) + ((bgr * bga) * (1 - fga))) / a;
	const g = ((fgg * fga) + ((bgg * bga) * (1 - fga))) / a;
	const b = ((fgb * fga) + ((bgb * bga) * (1 - fga))) / a;

	return hex(color([ r, g, b, a ]));
};

const parseBreezeColors = pipe(
	x => typeof x === 'string' ? x : x.toString('utf8'),
	ini.parse,
	mapKeys(pipe(split(':'), last)),
	map(map(hex)),
	map(o => new Proxy(o, {
		get(obj, prop) {
			if (prop in obj || prop === 'toJSON') {
				return obj[prop];
			}
			throw new TypeError('Undefined breeze theme property access: ' + prop);
		},
	})),
);

const evalStringRefs = intermediate => map(v => intermediate[v] || v, intermediate);
const evalThunks = intermediate => map(v => (typeof v === 'function' && v(intermediate)) || v, intermediate);

const infiniteObject = new Proxy(() => infiniteObject, {
	get() {
		return infiniteObject;
	},
});

const breezeToRofi = pipe(
	breeze => mapping({ breeze, alpha, mix, overlay }),
	evalStringRefs,
	evalStringRefs,
	evalThunks,
	evalStringRefs,
	evalStringRefs,
	evalThunks,
);

const breezeToRasi = pipe(
	parseBreezeColors,
	breezeToRofi,
	mapObjIndexed((v, k) => {
		if (!v) {
			console.warn('color not resolved:', k);
			return '#ff0000';
		}
		return v;
	}),
	async (colors) => {
		const templateRasi = await fs.readFile('./rofi/themes/android_notification.rasi', 'utf8');

		const result = await postcss([
			{
				postcssPlugin: 'dummy',
				Declaration(node, { Declaration }) {
					if (node.parent.selector !== '*') {
						return;
					}

					if (node._processed) {
						return;
					}

					if (!Number.isNaN(Number.parseInt(node.value, 10))) {
						return;
					}

					if (colors[node.prop] && colors[node.prop] != node.value) {
						node.replaceWith(new Declaration({
							prop: node.prop,
							value: colors[node.prop],
							_processed: true,
						}));
						return;
					}

					if (node.value !== '#00ff00') {
						console.warn('no color for:', node.prop, node.value);
						node.replaceWith(new Declaration({
							prop: node.prop,
							value: '#00ff00',
							_processed: true,
						}));
					}
				},
			},
		]).process(templateRasi, { from: undefined });

		return result.toString();
	},
);

const breezeToHexJSON = pipe(
	parseBreezeColors,
	x => JSON.stringify(x, null, 2),
);

gulp.task(
	'breeze-to-rofi',
	() => gulp
		.src('./breeze/colors/*.colors')
		.pipe(transform('utf8', breezeToRasi))
		.pipe(rename(path => {
			path.extname = '.rasi';
			return path;
		}))
		.pipe(gulp.dest('./dist/'))
);

gulp.task('default', gulp.series('breeze-to-rofi'));

gulp.on('error', console.error);
