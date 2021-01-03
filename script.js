const ls = async (filepath) => {
	const file = fs.stat(filepath).then((stats) => {
		if (stats.isFile()) {
			return [{
				filepath: filepath.split('..').pop(),
				mode: stats.mode,
			}];
		} else {
			return fs.readdir(filepath)
				.then((filenames) => Promise.all(filenames
					.map((name) => path.resolve(filepath, name))
					.map((file) => fs.stat(file).then((stats) => {
					return {
						filepath: strip(file),
						mode: stats.mode,
					}
				}
			))))
		}
	});
		const filesStats = await file;
	return filesStats;
}
