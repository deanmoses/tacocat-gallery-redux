export function endsWith(s: string, suffix: string): boolean {
	return !!s && s.slice(-suffix.length) === suffix;
}
