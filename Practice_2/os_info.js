const os = require('os');
const getOSInfo = () => {
    const platform = os.platform();
    let osInfo = '';
    switch (platform) {
        case 'darwin':
            osInfo = 'MacOS';
            break;
        case 'win32':
            osInfo = 'Windows';
            break;
        case 'linux':
            osInfo = 'Linux';
            break;
        default:
            osInfo = 'Unknown';
    }
    return osInfo;
}

module.exports = {
    getOSInfo
}