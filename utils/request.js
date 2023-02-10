export default function request(method, url, data, success, error) {
    let request = new XMLHttpRequest();
    request.open(method, url, true);
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (data) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            success(this.response);
        } else {
            console.error('AJAX Error : ' + this.status);
            error();
        }
    };

    request.onerror = function() {
        console.error('AJAX Error : ' + this.status);
        error();
    };

    request.send(data ? JSON.stringify(data) : null);
}