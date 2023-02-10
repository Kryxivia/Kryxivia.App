function closest(needle, haystack) {
    return haystack.reduce((a, b) => {
        if (Math.abs(b) < Math.abs(needle)) {
            let aDiff = Math.abs(a - needle);
            let bDiff = Math.abs(b - needle);

            if (aDiff === bDiff) {
                return a > b ? a : b;
            } else {
                return bDiff < aDiff ? b : a;
            }
        } else {
            return a;
        }
    });
}

function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
}

export { closest, hexToRgb };
